import classMap from 'classnames'
import { memo } from 'react'

interface TokenLogoProps {
    name: string
    className?: string
    style?: React.CSSProperties
    logoUrls: string[]
    width?: number
}

const TokenLogo = ({
    name,
    logoUrls,
    width = 40,
    className,
    style,
}: TokenLogoProps) => {
    if (logoUrls.length > 2) {
        width *= 0.7
    }
    return (
        <div
            className={classMap(
                'rei-pool-images',
                {
                    '-token3': logoUrls.length === 3,
                    '-token4': logoUrls.length === 4,
                },
                className
            )}
            style={{
                ...(logoUrls.length > 1
                    ? { width: 2 * width, height: width }
                    : { width: width, height: width }),
                ...style,
            }}
        >
            {logoUrls.length > 0 ? (
                logoUrls.map((logoUrl, i) => (
                    <img key={i} src={logoUrl} alt={name} width={width} />
                ))
            ) : (
                <i
                    className="fad fa-circle _cl-base-300"
                    style={{ width, fontSize: width }}
                />
            )}
        </div>
    )
}

export default memo(TokenLogo)
