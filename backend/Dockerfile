FROM golang:1.18

ENV CGO_ENABLED=0
ENV GOAMD64=v3
WORKDIR /workspace
ADD go.mod go.sum ./
RUN go mod download
ADD . .
RUN go build \
		-o .build/airdrop-backend \
		-ldflags "-w -s" \
		.

FROM gcr.io/distroless/static

WORKDIR /app

COPY --from=0 --link /workspace/.build/airdrop-backend ./

ENTRYPOINT ["/app/airdrop-backend"]
