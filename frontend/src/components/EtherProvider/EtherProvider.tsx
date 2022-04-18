import { CHAIN, getRpcUrl } from 'config/networkSetup'
import { ethers } from 'ethers'
import { useSnackbar } from 'notistack'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { SupportProvider } from 'types/provider'
import { Core as Web3Modal } from 'web3modal/dist/core'

export const EtherProviderContext = createContext<
    | {
          provider: SupportProvider | undefined
          address: string
          networkId: number
          connectWalletPending: boolean
          connected: boolean
          connectWallet: (web3Modal: Web3Modal) => Promise<void>
          connectGuestWallet: () => Promise<void>
          disconnectWallet: (web3Modal: Web3Modal) => Promise<void>
      }
    | undefined
>(undefined)

// eslint-disable-next-line react/prop-types
const EtherProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [provider, setProvider] = useState<SupportProvider | undefined>(
        undefined
    )
    const [address, setAddress] = useState('')
    const [networkId, setNetworkId] = useState(0)
    const [connectWalletPending, setConnectWalletPending] = useState(false)
    const [connected, setConnected] = useState(false)

    const connectGuestWallet = useCallback(async () => {
        setConnectWalletPending(true)
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                getRpcUrl(CHAIN.DEFAULT)
            )
            setProvider(provider)
            setAddress('')
            setNetworkId(CHAIN.DEFAULT)
            setConnected(false)
        } catch (e) {
            if (e) {
                console.error(e)
            }
            enqueueSnackbar(`Connect Wallet Error`, {
                variant: 'error',
            })
        } finally {
            setConnectWalletPending(false)
        }
    }, [enqueueSnackbar])

    const disconnectWallet = useCallback(async (web3Modal?: Web3Modal) => {
        if (web3Modal) {
            web3Modal.clearCachedProvider()
        }
        setProvider(undefined)
        setAddress('')
        setConnected(false)
        // connectGuestWallet()
    }, [])

    const connectWallet = useCallback(
        async (web3Modal: Web3Modal) => {
            setConnectWalletPending(true)
            try {
                const web3Provider = await web3Modal.connect()
                const provider = new ethers.providers.Web3Provider(web3Provider)

                const subscribeProvider = (provider) => {
                    if (!provider) {
                        return
                    }

                    provider.on('close', () => {
                        disconnectWallet(web3Modal)
                    })

                    provider.on('disconnect', async () => {
                        disconnectWallet(web3Modal)
                    })

                    provider.on(
                        'accountsChanged',
                        async (accounts: string[]) => {
                            if (accounts.length > 0) {
                                setAddress(ethers.utils.getAddress(accounts[0]))
                            } else {
                                disconnectWallet(web3Modal)
                            }
                        }
                    )

                    provider.on('chainChanged', async () => {
                        /* NOTE: Force reload to initate all state */
                        window.location.reload()
                    })
                }
                subscribeProvider(web3Provider)

                const accounts = await provider.listAccounts()
                const address = ethers.utils.getAddress(accounts[0])
                let selectNetworkId = await provider
                    .getNetwork()
                    .then((x) => x.chainId)
                if (selectNetworkId === 86) {
                    // Trust provider returns an incorrect chainId for BSC.
                    console.log('selectNetworkId === 86')

                    selectNetworkId = 56
                }

                if (networkId > 0 && selectNetworkId !== selectNetworkId) {
                    window.location.reload()
                }

                setProvider(provider)
                setAddress(address)
                setConnected(true)
                setNetworkId(selectNetworkId)
            } catch (e) {
                if (e?.indexOf?.('Modal closed by user') > -1) {
                } else {
                    enqueueSnackbar(`Connect Wallet Error`, {
                        variant: 'error',
                    })
                }
                if (e) {
                    console.error(e)
                    throw e
                }
            } finally {
                setConnectWalletPending(false)
            }
        },
        [disconnectWallet, enqueueSnackbar, networkId]
    )

    return (
        <EtherProviderContext.Provider
            value={{
                provider,
                address,
                networkId,
                connectWalletPending,
                connectWallet,
                connectGuestWallet,
                disconnectWallet,
                connected,
            }}
        >
            {children}
        </EtherProviderContext.Provider>
    )
}

export const useEtherProvider = () => {
    const context = useContext(EtherProviderContext)
    if (context === undefined) {
        throw new Error('useEtherProvider must be used within a EtherProvider')
    }
    return context
}

export default EtherProvider
