# Rei Airdrop Backend

## Docker

```sh
$ make docker
```

## Deploy

```sh
$ make deploy
```

## APIs

- List

```sh
$ http post https://airdrop.reichain.io/api/list address=ADDRESS
HTTP/1.1 200 OK
Content-Length: XXX
Content-Type: application/json; charset=utf-8
Vary: Accept-Encoding

{
    "ok": true,
    "result": {
        "address": "ADDRESS",
        "orders": [
            {
                "address": "ADDRESS",
                "amount": "AMOUNT IN WEI",
                "detail": "AIRDROP DETAIL",
                "expires_at": "RFC3339 TIMESTAMP",
                "id": "ID",
                "unlock_at": "RFC3339 TIMESTAMP"
            }
        ]
    }
}
```

- Claim

```sh
http post https://airdrop.reichain.io/api/claim address=ADDRESS id=ID
HTTP/1.1 200 OK
Content-Length: XXX
Content-Type: application/json; charset=utf-8
Vary: Accept-Encoding

{
    "ok": true,
    "result": {
        "address": "ADDRESS",
        "amount": "AMOUNT IN WEI",
        "deadline": UNIX TIME,
        "id": "ID",
        "signature": "SIGNATURE"
    }
}
```
