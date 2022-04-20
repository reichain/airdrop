import WalletConnectProvider from '@walletconnect/web3-provider'
import { CHAIN, networkSettings } from 'config/networkSetup'
import { TokenType } from 'config/tokens/types'
import { ICoreOptions } from 'web3modal'
import { rei } from '../config/tokens'

export interface MixtureCommonToken {
    name: string
    address: string
}

export interface NetworkPool {
    id: string
    slug: string
    name: string
    tokenAddress: string
    izlude: string
    status: 'active' | 'eol'
    platform: string
    assets: string[]
    buyTokenUrl?: string
    addLiquidityUrl?: string
    removeLiquidityUrl?: string
    isDev?: boolean
    isUnsafe?: boolean
    isStaking?: boolean
    unsafeWording?: string
    boostedId?: string
    boostedBy?: string
    timelockMonitorUrl?: string
    addDate?: number
    depositTokenAllows?: string[]
    depositTokenExcludes?: string[]
    withdrawTokenAllows?: string[]
    withdrawTokenExcludes?: string[]
    disableMove?: boolean
    disableRemoveLP?: boolean
}

type TokenBase = {
    name: string
    symbol: string
    address: string
    decimals: number
    logoURIs: string[]
}

export type Token = TokenBase & {
    type: TokenType.COIN
}

export type NativeToken = TokenBase & {
    type: 'native'
    wAddress: string
}

export type UniPair = TokenBase & {
    type: TokenType.UNI_PAIR
    poolTokens: string[]
    factory: string
}

export type NetworkToken = Token | NativeToken | UniPair

export const getNetworkTokens = (
    networkId: number
): readonly NetworkToken[] => {
    switch (networkId) {
        case CHAIN.REI:
        case CHAIN.REI_TESTNET:
            return rei.tokens
        default:
            console.error(
                `Create Tokenlist for this networkId (${networkId}) first. See src/features/configure/tokenlist/*_tokenlist.tsx`
            )
            return []
    }
}

export const getNetworkConnectors = (): Partial<ICoreOptions> => {
    return {
        cacheProvider: true,
        providerOptions: {
            injected: {
                package: 'injected',
                // display: {
                //     name: 'Meta',
                //     description: 'Browse rWallet',
                // },
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: Object.fromEntries(
                        Object.entries(networkSettings).map(
                            ([networkID, settings]) => [
                                networkID,
                                (settings.rpcUrls && settings.rpcUrls[0]) || '',
                            ]
                        )
                    ),
                    chainId: CHAIN.REI,
                },
            },
        },
    }
}
