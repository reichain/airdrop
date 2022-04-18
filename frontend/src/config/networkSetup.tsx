export type EthereumNetwork = {
    chainId: string
    blockExplorerUrls?: string[]
    chainName?: string
    iconUrls?: string[]
    nativeCurrency?: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls?: string[]
}

export const CHAIN = {
    DEFAULT: 55555,
    REI: 55555,
    REI_TESTNET: 55556,
}

export const networkSettings: {
    [key: number]: EthereumNetwork
} = {
    [CHAIN.REI]: {
        chainId: `0x${parseInt('55555', 10).toString(16)}`,
        chainName: 'REI',
        nativeCurrency: {
            name: 'REI',
            symbol: 'REI',
            decimals: 18,
        },
        rpcUrls: ['https://rei-rpc.moonrhythm.io'],
        blockExplorerUrls: ['https://reiscan.com'],
    },
    [CHAIN.REI_TESTNET]: {
        chainId: `0x${parseInt('55556', 10).toString(16)}`,
        chainName: 'REI Testnet',
        nativeCurrency: {
            name: 'tREI',
            symbol: 'tREI',
            decimals: 18,
        },
        rpcUrls: ['https://rei-testnet-rpc.moonrhythm.io/'],
        blockExplorerUrls: ['https://testnet.reiscan.com'],
    },
}

const networkTxUrls: { [key: number]: (hash: string) => string } = {
    [CHAIN.REI]: (hash: string) => `https://reiscan.com/tx/${hash}`,
    [CHAIN.REI_TESTNET]: (hash: string) =>
        `https://testnet.reiscan.com/tx/${hash}`,
}

const networkAddressUrls: { [key: number]: (hash: string) => string } = {
    [CHAIN.REI]: (addr: string) => `https://reiscan.com/address/${addr}`,
    [CHAIN.REI_TESTNET]: (addr: string) =>
        `https://testnet.reiscan.com/address/${addr}`,
}

export const getChainLogo = (chainId: number) => {
    switch (chainId) {
        case CHAIN.REI:
        case CHAIN.REI_TESTNET:
            return './images/token/REI.svg'
        default:
            break
    }
}

export const getChainName = (chainId: number) =>
    networkSettings[chainId]?.chainName || ''

export const getRpcUrl = (chainId: number) =>
    networkSettings[chainId]?.rpcUrls?.[0] || ''

export const getTxUrl = (chainId: number) => networkTxUrls[chainId]

export const getAddressUrl = (chainId: number) => networkAddressUrls[chainId]
