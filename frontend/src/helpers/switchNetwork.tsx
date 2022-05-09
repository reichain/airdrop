import { EthereumNetwork } from 'config/networkSetup'
import { ProviderContext as NotistackProviderContext } from 'notistack'
import { SupportProvider } from 'types/provider'

interface SwitchNetwork {
    provider: SupportProvider
    network: EthereumNetwork
    enqueueSnackbar: NotistackProviderContext['enqueueSnackbar']
}

export const switchNetwork = async ({
    provider,
    network,
    enqueueSnackbar,
}: SwitchNetwork) => {
    try {
        await provider.send('wallet_switchEthereumChain', [
            { chainId: network.chainId },
        ])
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                const addNetwork = {
                    chainId: network.chainId,
                    blockExplorerUrls: network.blockExplorerUrls,
                    chainName: network.chainName,
                    iconUrls: network.iconUrls,
                    nativeCurrency: network.nativeCurrency
                        ? {
                              name: network.nativeCurrency?.name,
                              symbol: network.nativeCurrency?.symbol,
                              decimals: network.nativeCurrency?.decimals,
                          }
                        : undefined,
                    rpcUrls: network.rpcUrls,
                }

                await provider.send('wallet_addEthereumChain', [addNetwork])
            } catch (addError) {
                enqueueSnackbar(
                    `Add network error: ${addError?.message || addError}`,
                    {
                        variant: 'error',
                    }
                )
            }
        } else {
            enqueueSnackbar(
                `Switch network error: ${switchError?.message || switchError}`,
                {
                    variant: 'error',
                }
            )
        }
    }
}
