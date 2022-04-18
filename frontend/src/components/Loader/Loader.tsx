import ContentLoader from 'react-content-loader'

const Loader = ({
    width,
    height,
    radius = 16,
    ...props
}: {
    width: number
    height: number
    radius?: number
    className?: string
}) => {
    return (
        <ContentLoader
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor="rgba(253, 216, 53, 1)"
            foregroundColor="rgba(255, 253, 231, 1)"
            {...props}
        >
            <rect x="0" y="0" width={width} height={height} rx={radius} />
        </ContentLoader>
    )
}

export default Loader
