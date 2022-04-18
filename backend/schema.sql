create table airdrops (
    id         bigserial,
    address    string      not null,
    amount     string      not null,
    detail     string      not null,
    unlock_at  timestamptz not null,
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    primary key (id)
);
create index airdrops_address_idx on airdrops (address);
