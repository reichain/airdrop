import { Tooltip } from '@material-ui/core'
import axios from 'axios'
import Countdown from 'components/Countdown/Countdown'
import { useEtherProvider } from 'components/EtherProvider/EtherProvider'
import OnTopCard from 'components/OnTopCard/OnTopCard'
import TokenLogo from 'components/TokenLogo/TokenLogo'
import { ethers } from 'ethers'
import { getNetworkTokens } from 'helpers/getNetworkData'
import { useSnackbar } from 'notistack'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Airdrop__factory } from 'typechain'
import { isWeb3Provider } from 'types/provider'
import LabeledStat from './LabeledStat/LabeledStat'
import './styles.scss'

export interface AirdropItem {
    id: string
    address: string
    amount: string
    unlock_at: string
    expires_at: string
    detail?: string

    wasRedeemed?: boolean
}

interface LockerItemProps {
    airdropItem: AirdropItem
    contractAddress?: string
}

enum AirdropItemStatus {
    'locking' = 'locking',
    'redeemable' = 'redeemable',
    'redeemed' = 'redeemed',
    'expired' = 'expired',
}

const LockerItem = ({ airdropItem, contractAddress }: LockerItemProps) => {
    const { provider, networkId, address } = useEtherProvider()
    const { enqueueSnackbar } = useSnackbar()
    const [isRedeeming, setIsRedeeming] = useState(false)
    const networkToken = getNetworkTokens(networkId)
    const [airdropItemStatus, setAirdropItemStatus] =
        useState<AirdropItemStatus>()
    const [isFetchingAirdropRedeem, setIsFetchingAirdropRedeem] = useState(true)

    const fetchRedeemStatus = useCallback(async () => {
        if (!provider || !contractAddress) {
            return
        }
        try {
            const airdropContract = Airdrop__factory.connect(
                contractAddress,
                provider
            )

            return airdropContract.orders(airdropItem.id)
        } catch (e) {
            console.error(e)
            throw e
        }
        return false
    }, [provider, airdropItem, contractAddress])

    useEffect(() => {
        if (!provider || !networkId || !contractAddress) {
            return
        }
        const fetch = () => {
            if (airdropItem && new Date(airdropItem?.unlock_at) <= new Date()) {
                return fetchRedeemStatus().then((wasRedeemed) => {
                    setIsFetchingAirdropRedeem(false)
                    if (wasRedeemed) {
                        return setAirdropItemStatus(AirdropItemStatus.redeemed)
                    } else if (
                        new Date(airdropItem?.expires_at) <= new Date()
                    ) {
                        return setAirdropItemStatus(AirdropItemStatus.expired)
                    } else {
                        return setAirdropItemStatus(
                            AirdropItemStatus.redeemable
                        )
                    }
                })
            }

            setIsFetchingAirdropRedeem(false)
            return setAirdropItemStatus(AirdropItemStatus.locking)
        }
        fetch()
        const id = setInterval(fetch, 5000)
        return () => clearInterval(id)
    }, [fetchRedeemStatus, networkId, provider, airdropItem, contractAddress])

    const airdropUnlockAt = useMemo(() => {
        return airdropItem?.unlock_at ? new Date(airdropItem?.unlock_at) : null
    }, [airdropItem?.unlock_at])

    const airdropExpiresAt = useMemo(() => {
        return airdropItem?.expires_at
            ? new Date(airdropItem?.expires_at)
            : null
    }, [airdropItem?.expires_at])

    const airdropRedeemableCountdown = useMemo(() => {
        if (airdropItemStatus === AirdropItemStatus.redeemed) {
            return 'Redeemed'
        } else if (airdropItemStatus === AirdropItemStatus.redeemable) {
            return 'Redeemable'
        } else if (
            airdropItemStatus === AirdropItemStatus.locking &&
            airdropUnlockAt
        ) {
            return <Countdown deadline={airdropUnlockAt.getTime()} />
        }

        return ''
    }, [airdropItemStatus, airdropUnlockAt])

    const airdropExpiresCountdown = useMemo(() => {
        if (
            airdropItemStatus === AirdropItemStatus.redeemable &&
            airdropExpiresAt
        ) {
            return <Countdown deadline={airdropExpiresAt.getTime()} />
        }

        return ''
    }, [airdropItemStatus, airdropExpiresAt])

    const redeemButtonWording = () => {
        if (isFetchingAirdropRedeem || isRedeeming) {
            return 'Redeem...'
        }

        switch (airdropItemStatus) {
            case AirdropItemStatus.redeemed:
                return 'Redeemed'
            case AirdropItemStatus.redeemable:
            case AirdropItemStatus.locking:
                return 'Redeem'
            case AirdropItemStatus.expired:
                return 'Expired'
            default:
                return '????'
        }
    }

    const fetchClaimDetailApi = useCallback(async () => {
        try {
            const url = `${process.env.REACT_APP_REI_API}/claim`
            const { data } = await axios.post(url, {
                address,
                id: airdropItem.id,
            })

            return data.result as {
                contract: string
                address: string
                amount: string
                deadline: number
                id: string
                signature: string
            }
        } catch (e) {
            console.error(e)
            throw e
        }
    }, [airdropItem, address])

    const onRedeem = useCallback(async () => {
        if (!airdropItem) {
            console.error('airdrop is undefined')
            return
        }
        if (!provider) {
            console.error('provider is undefined')
            return
        }
        if (!isWeb3Provider(provider)) {
            console.error('provider is not web3provider')
            return
        }
        setIsRedeeming(true)

        try {
            const { id, amount, deadline, signature, contract } =
                await fetchClaimDetailApi()
            if (process.env?.NODE_ENV === 'development') {
                console.log('fetchClaimDetailApi result', {
                    id,
                    id2: airdropItem.id,
                    amount,
                    deadline,
                    signature,
                    contract,
                })
            }
            const airdropContract = Airdrop__factory.connect(contract, provider)
            await airdropContract
                .connect(provider.getSigner())
                .claim(airdropItem.id, amount, deadline, signature, {
                    gasLimit: 1_000_000,
                })
                .then((tx) => tx.wait())

            enqueueSnackbar('Redeem success', {
                variant: 'success',
            })
        } catch (error) {
            console.error(error)
            enqueueSnackbar(
                `Redeem error: ${
                    error?.data?.message || error?.message || error
                }`,
                {
                    variant: 'error',
                }
            )
        }
        setIsRedeeming(false)
    }, [fetchClaimDetailApi, enqueueSnackbar, airdropItem, provider])

    return (
        <div className="rei-card airdrop-locker-item-summary _pst-rlt _dp-f _fdrt-r-sm _fdrt-cl _pdv-24px _pdv-16px-sm _pdh-32px _alit-ct">
            {airdropItemStatus === AirdropItemStatus.redeemed ? (
                <OnTopCard>Redeemed</OnTopCard>
            ) : null}
            <div className="layout _f-1 _gg-12px _w-100pct _w-us-sm">
                <div className="_dp-f _alit-ct _jtfs-st-sm _jtfs-ct">
                    <TokenLogo
                        name={'REI'}
                        logoUrls={
                            networkToken?.find((item) => item.symbol === 'REI')
                                ?.logoURIs || []
                        }
                        width={50}
                    />
                    <div className="lo-12 _f-1 _gg-4px _alit-ct _alct-ct _mgl-16px">
                        <div className="_fs-300 _cl-text-default-2">LOCK</div>
                        <div className="_fw-600 _fs-400 _ffml-secondary _cl-text-default-1">
                            {airdropItem
                                ? `${ethers.utils.commify(
                                      ethers.utils.formatEther(
                                          airdropItem?.amount
                                      )
                                  )} ${'REI'}`
                                : '..'}
                        </div>
                    </div>
                </div>

                <LabeledStat
                    label="Description"
                    value={airdropItem.detail || '-'}
                />
                <Tooltip
                    enterTouchDelay={0}
                    title={
                        <>
                            This airdrop will be unlocked to redeem at this
                            time.
                        </>
                    }
                    placement="top"
                    arrow
                    classes={{
                        tooltip: '_fs-300',
                    }}
                    interactive
                >
                    <div className="_mgv-at _cs-h">
                        <LabeledStat
                            label="Unlock at"
                            value={
                                airdropUnlockAt
                                    ? airdropUnlockAt.toLocaleString('en-GB')
                                    : '...'
                            }
                            subvalue={airdropRedeemableCountdown}
                        />
                    </div>
                </Tooltip>

                <Tooltip
                    enterTouchDelay={0}
                    title={
                        <>
                            After it has been unlocked, there will be available
                            to redeem until this time.
                        </>
                    }
                    placement="top"
                    arrow
                    classes={{
                        tooltip: '_fs-300',
                    }}
                    interactive
                >
                    <div className="_mgv-at _cs-h">
                        <LabeledStat
                            label="Expires at"
                            value={
                                airdropExpiresAt
                                    ? airdropExpiresAt.toLocaleString('en-GB')
                                    : '-'
                            }
                            subvalue={airdropExpiresCountdown}
                        />
                    </div>
                </Tooltip>

                <div
                    className="
                        _w-fc-sm _w-100pct _mgt-4px _mgt-0px-sm _mgl-0px _mgl-8px-sm
                        _dp-g _gg-12px _gatf-cl-sm _gatf-r
                        _alct-ct _jtfs-e
                    "
                >
                    <button
                        className="rei-button _w-fc-sm _w-100pct _mnw-128px"
                        disabled={
                            airdropItemStatus !==
                                AirdropItemStatus.redeemable ||
                            isFetchingAirdropRedeem ||
                            isRedeeming
                        }
                        onClick={onRedeem}
                    >
                        {redeemButtonWording()}
                    </button>
                    {/* <button
                        className="rei-button _w-fc-sm _w-100pct"
                        disabled
                    >
                        Claim Claim
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default memo(LockerItem)
