import Loader from 'components/Loader/Loader'
import { memo } from 'react'

interface LabeledStatProps {
    value: React.ReactNode
    label: React.ReactNode
    boosted?: string
    isLoading?: boolean
    subvalue?: React.ReactNode
}

const LabeledStat = ({
    value,
    label,
    isLoading = false,
    subvalue,
}: LabeledStatProps) => {
    return (
        <div className="lo-12 _jtfit-ct _gg-4px _tal-ct _alct-ct">
            <div className="_fs-200 _cl-text-default-3">{label} </div>
            <div>
                {isLoading ? (
                    <Loader width={50} height={30} />
                ) : (
                    <span className="_fw-600">{value}</span>
                )}
            </div>
            <div className="_fs-200 _cl-text-default-3">
                {subvalue && !isLoading ? <span>({subvalue})</span> : ''}
            </div>
        </div>
    )
}

export default memo(LabeledStat)
