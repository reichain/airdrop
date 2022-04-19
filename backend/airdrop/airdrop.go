package airdrop

import (
	"context"
	"crypto/ecdsa"
	"database/sql"
	"errors"
	"math/big"
	"strconv"
	"strings"
	"time"

	"github.com/acoshift/arpc/v2"
	"github.com/acoshift/pgsql"
	"github.com/acoshift/pgsql/pgctx"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

var ContractAddress = common.HexToAddress("0x12CB3f5C6181aEE015021F975dd20f2fA82Cbb72")

//go:generate abigen --abi abi_airdrop.json --pkg airdrop --type Airdrop --out abi_airdrop.go

var (
	ErrOrderNotFound = arpc.NewError("airdrop: order not found")
	ErrEmptyAmount   = arpc.NewError("airdrop: empty amount")
	ErrNoSigner      = arpc.NewError("airdrop: no signer")
	ErrNoClient      = arpc.NewError("airdrop: no client")
)

var signer *ecdsa.PrivateKey

func SetSigner(s *ecdsa.PrivateKey) {
	signer = s
}

var client *ethclient.Client

func SetClient(c *ethclient.Client) {
	client = c
}

type Order struct {
	ID        string    `json:"id"`
	Address   string    `json:"address"`
	Amount    string    `json:"amount"`
	UnlockAt  time.Time `json:"unlock_at"`
	ExpiresAt time.Time `json:"expires_at"`
	Detail    string    `json:"detail"`
}

type ListRequest struct {
	Address string `json:"address"`
}

type ListResult struct {
	Address string   `json:"address"`
	Orders  []*Order `json:"orders"`
}

// List lists orders for given address
func List(ctx context.Context, req *ListRequest) (*ListResult, error) {
	addr := parseAddress(req.Address)

	var res ListResult
	res.Address = addr.String()
	err := pgctx.Iter(ctx, func(scan pgsql.Scanner) error {
		var x Order
		err := scan(&x.ID, &x.Address, &x.Amount, &x.Detail, &x.UnlockAt, &x.ExpiresAt)
		if err != nil {
			return err
		}
		x.Address = parseAddress(x.Address).String()
		res.Orders = append(res.Orders, &x)
		return nil
	},
		// language=SQL
		`
			select id, address, amount, detail, unlock_at, expires_at
			from airdrops
			where address = $1
			order by created_at desc
		`,
		strings.ToLower(addr.String()),
	)
	if err != nil {
		return nil, err
	}
	return &res, nil
}

type ClaimRequest struct {
	Address string `json:"address"`
	ID      string `json:"id"`
}

type ClaimResult struct {
	ID        string `json:"id"`
	Contract  string `json:"contract"`
	Address   string `json:"address"`
	Amount    string `json:"amount"`
	Deadline  int64  `json:"deadline"`
	Signature string `json:"signature"`
}

// Claim signs order
func Claim(ctx context.Context, req *ClaimRequest) (*ClaimResult, error) {
	if client == nil {
		return nil, ErrNoClient
	}
	if signer == nil {
		return nil, ErrNoSigner
	}

	addr := parseAddress(req.Address)

	var x ClaimResult
	// language=SQL
	err := pgctx.QueryRow(ctx, `
		select id, address, amount
		from airdrops
		where id = $1
		  and address = $2
		  and unlock_at <= now()
		  and expires_at > now() 
	`, parseInt64(req.ID), strings.ToLower(addr.String())).Scan(
		&x.ID, &x.Address, &x.Amount,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrOrderNotFound
	}
	if err != nil {
		return nil, err
	}

	x.Address = parseAddress(x.Address).String()

	id, _ := new(big.Int).SetString(x.ID, 10)
	if id.Cmp(big.NewInt(0)) <= 0 {
		return nil, ErrOrderNotFound
	}

	amount, _ := new(big.Int).SetString(x.Amount, 10)
	if amount.Cmp(big.NewInt(0)) <= 0 {
		return nil, ErrEmptyAmount
	}

	deadline := time.Now().Add(10 * time.Minute).Unix()

	c, err := NewAirdrop(ContractAddress, client)
	if err != nil {
		return nil, err
	}
	hash, err := c.Hash(&bind.CallOpts{Context: ctx}, addr, id, amount, big.NewInt(deadline))
	if err != nil {
		return nil, err
	}
	sig, err := crypto.Sign(hash[:], signer)
	if err != nil {
		return nil, err
	}
	sig[64] += 27
	x.Signature = hexutil.Encode(sig[:])
	x.Deadline = deadline
	x.Contract = ContractAddress.String()

	return &x, nil
}

func parseAddress(addr string) common.Address {
	addr = strings.TrimSpace(addr)
	addr = strings.ToLower(addr)
	return common.HexToAddress(addr)
}

func parseInt64(s string) int64 {
	p, _ := strconv.ParseInt(s, 10, 64)
	return p
}
