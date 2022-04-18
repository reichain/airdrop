import { useCallback, useMemo, useState } from 'react'

const addChain = async () => {
    try {
        if ((window as any).ethereum) {
            await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${parseInt('55555', 10).toString(16)}`,
                        chainName: 'REI',
                        nativeCurrency: {
                            symbol: 'REI',
                            decimals: 18,
                        },
                        rpcUrls: ['https://rei-rpc.moonrhythm.io'],
                        blockExplorerUrls: ['https://reiscan.com'],
                    },
                ],
            })
        } else {
            await window.open(
                'https://killswitchofficial.gitbook.io/rei-chain/technology/rpc-network',
                '_blank'
            )
        }
    } catch (error) {
        console.error('add chain error:', error)
    }
}

interface HeaderLinksProps {
    address: string
    connected: boolean
    connectWallet: () => any
    disconnectWallet: () => any
}

const HeaderLinks = ({
    connected,
    address,
    connectWallet,
    disconnectWallet,
}: HeaderLinksProps) => {
    const [_, updateState] = useState(false)

    const shortAddress = useMemo(() => {
        if (!connected) {
            return
        }

        if (address.length < 11) {
            return address
        } else {
            return `${address.slice(0, 6)}...${address.slice(-4)}`
        }
    }, [address, connected])

    const handleAddChain = useCallback(async () => {
        await addChain()
        updateState((prev) => !prev)
    }, [])

    return (
        <>
            <div className="_dp-f _fdrt-cl _fdrt-r-md _pdt-64px _pdbt-12px _pdv-0px-md _mgh-12px-md">
                <div
                    className="rei-button _pdv-12px _pdh-16px _mnw-128px _tal-ct"
                    onClick={connected ? disconnectWallet : connectWallet}
                >
                    <i className="far fa-wallet _mgr-12px" />
                    {connected ? <>{shortAddress}</> : <>Connect Wallet</>}
                </div>
            </div>
            <div className="_dp-f _pst-asl-lg _l-0px _r-0px  _w-fc-md _fdrt-cl _fdrt-r-md _alit-ct _mgh-at-md _fs-400 _fw-400"></div>{' '}
        </>
    )
}

export default HeaderLinks
