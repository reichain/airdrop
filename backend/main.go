package main

import (
	"database/sql"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/acoshift/arpc/v2"
	"github.com/acoshift/pgsql/pgctx"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	_ "github.com/lib/pq"
	"github.com/moonrhythm/parapet"
	"github.com/moonrhythm/parapet/pkg/cors"

	"github.com/reichain/airdrop/backend/airdrop"
)

func main() {
	log.Println("airdrop-backend")

	{
		// allow signer to be empty for read-only mode
		if pk := os.Getenv("SIGNER"); pk != "" {
			signer, err := crypto.HexToECDSA(pk)
			if err != nil {
				log.Fatalf("can not parse pk; %v", err)
			}
			airdrop.SetSigner(signer)
			log.Printf("signer address: %s", crypto.PubkeyToAddress(signer.PublicKey))
		} else {
			log.Println("empty signer, read-only mode")
		}
	}

	{
		rpcURL := os.Getenv("RPC_URL")
		if rpcURL == "" {
			rpcURL = "https://rei-rpc.moonrhythm.io"
		}
		client, err := ethclient.Dial(rpcURL)
		if err != nil {
			log.Fatalf("can not dial client; %v", err)
		}
		defer client.Close()
		airdrop.SetClient(client)
		log.Printf("client dialed to %s", rpcURL)
	}

	db, err := sql.Open("postgres", os.Getenv("SQL_URL"))
	if err != nil {
		log.Fatalf("can not connect to db; %v", err)
	}
	defer db.Close()

	mux := http.NewServeMux()

	rpc := arpc.New()
	rpc.OnError(func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("rpc: %s error; %v", r.RequestURI, err)
	})
	mux.Handle("/list", rpc.Handler(airdrop.List))
	mux.Handle("/claim", rpc.Handler(airdrop.Claim))

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := parapet.NewBackend()
	srv.Use(cors.CORS{
		AllowAllOrigins: true,
		AllowMethods:    []string{"POST"},
		AllowHeaders:    []string{"Content-Type"},
		MaxAge:          time.Hour,
	})
	srv.Use(parapet.MiddlewareFunc(pgctx.Middleware(db)))
	srv.Handler = mux
	srv.Addr = net.JoinHostPort(host, port)

	log.Printf("start server at %s", srv.Addr)
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatalf("can not start web server; %v", err)
	}
}
