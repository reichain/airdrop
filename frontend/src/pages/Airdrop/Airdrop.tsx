import axios from 'axios'
import { useEtherProvider } from 'components/EtherProvider/EtherProvider'
import Loader from 'components/Loader/Loader'
import { CHAIN, networkSettings } from 'config/networkSetup'
import { createWeb3Modal } from 'helpers/createWeb3Modal'
import { switchNetwork } from 'helpers/switchNetwork'
import { useSnackbar } from 'notistack'
import { memo, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import InfiniteScroll from 'react-infinite-scroll-component'
import LockerItem, { AirdropItem } from './components/LockerItem/LockerItem'

const fetchAirdropList = (address: string) => {
    return axios.post(`${process.env.REACT_APP_REI_API}/list`, {
        address,
    })
}

const Airdrop = () => {
    const { address, connected, networkId, provider, connectWallet } =
        useEtherProvider()
    const [fetchAirdropListPending, setFetchAirdropListPending] = useState(true)
    const [fetchAirdropListDone, setFetchAirdropListDone] = useState(false)
    const [contractAddress, setContractAddress] = useState<string>()
    const [error, setError] = useState(null)
    const [airdropList, setAirdropList] = useState([] as AirdropItem[])
    const { enqueueSnackbar } = useSnackbar()

    if (error) {
        throw error
    }

    const handleConnectWallet = useCallback(() => {
        const web3Modal = createWeb3Modal()
        connectWallet(web3Modal)
    }, [connectWallet])

    useEffect(() => {
        const fetch = async () => {
            if (!address || networkId !== CHAIN.DEFAULT) {
                return
            }
            try {
                const { data } = await fetchAirdropList(address)
                const { orders, contract } = data.result
                setFetchAirdropListDone(true)
                if (orders && orders.length) {
                    setAirdropList(orders)
                    setContractAddress(contract)
                }
            } catch (error) {
                console.error(error)
                enqueueSnackbar(
                    `Load Airdrop List error: ${
                        error?.data?.message || error?.message || error
                    }`,
                    {
                        variant: 'error',
                    }
                )
                setError(error)
            }
            setFetchAirdropListPending(false)
        }

        fetch()
    }, [address, enqueueSnackbar, networkId])

    /* Render Section Below */

    if (!connected) {
        return (
            <>
                <div className="rei-card _mgv-at _mgh-at _zid-1 _pd-24px _tal-ct _dp-f _fdrt-cl _lh-130pct">
                    <i className="far fa-info-circle"></i> &nbsp;Please connect
                    your wallet to see your airdrop.
                    <button
                        className="rei-button _w-fc _mgh-at _mgt-24px"
                        onClick={handleConnectWallet}
                    >
                        Connect Wallet
                    </button>
                </div>
            </>
        )
    }

    if (networkId !== CHAIN.DEFAULT) {
        return (
            <>
                <div className="rei-card _mgv-at _mgh-at _zid-1 _pd-24px _tal-ct _dp-f _fdrt-cl _lh-130pct">
                    <i className="far fa-info-circle"></i> &nbsp;Please switch
                    to REI Chain network.
                    <button
                        className="rei-button _w-fc _mgh-at _mgt-24px"
                        onClick={() => {
                            if (!provider) {
                                return
                            }
                            switchNetwork({
                                provider,
                                network: networkSettings[CHAIN.DEFAULT],
                                enqueueSnackbar,
                            })
                        }}
                    >
                        Switch to REI Chain
                    </button>
                </div>
            </>
        )
    }

    if (!fetchAirdropListDone && fetchAirdropListPending) {
        return <Loader width={800} height={88} />
    }

    if (
        fetchAirdropListDone &&
        !fetchAirdropListPending &&
        airdropList.length === 0
    ) {
        return (
            <>
                <div className="rei-card _pd-24px _mgv-12px _mgl-8px _bdfb-4px _lh-150pct">
                    <i className="far fa-info-circle"></i> &nbsp;Your airdrop
                    list is empty. You can{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://t.me/reichain"
                        className="rei-link"
                    >
                        Join the channel
                    </a>{' '}
                    to see what happens now.{' '}
                </div>
            </>
        )
    }

    return (
        <>
            {airdropList.length > 0 ? (
                <>
                    <div className="_fs-600 _mgbt-24px _mgbt-16px-sm _w-fc _bdrd-8px _bdfb-4px">
                        Claim REI Tokens
                    </div>

                    <div className="_w-100pct">
                        <InfiniteScroll
                            loader={null}
                            dataLength={airdropList.length}
                            hasMore={false}
                            next={() => false}
                            className="lo-12 _gg-16px _gg-8px-sm _pdv-0px _pdh-4px"
                        >
                            {airdropList.map((airdrop) => (
                                <LockerItem
                                    key={airdrop.id}
                                    airdropItem={airdrop}
                                    contractAddress={contractAddress}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                </>
            ) : null}
        </>
    )
}

const Wrapper = () => (
    <div
        className="_mgh-at _pdh-24px _pdh-48px-sm _bdrd-8px _bdfb-4px _mgt-0px _mgt-32px-md _mgbt-32px _zid-1"
        style={{ maxWidth: 1000, paddingTop: 'var(--header-height)' }}
    >
        <div className="_fs-800 _fw-500 _mgt-16px _mgt-4px-md _mgbt-12px _mgbt-24px-md _w-fc _bdrd-8px _bdfb-4px">
            Airdrop
        </div>
        <ErrorBoundary
            FallbackComponent={() => (
                <div className="rei-card _pd-24px _mgv-12px _mgl-8px _bdfb-4px _lh-150pct">
                    Some error occurred. Please wait until our devs fix it.
                </div>
            )}
        >
            <Airdrop />
        </ErrorBoundary>
    </div>
)

export default memo(Wrapper)
