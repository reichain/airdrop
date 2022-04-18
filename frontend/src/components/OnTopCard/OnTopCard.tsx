import styles from './styles.module.scss'

const OnTopCard = ({ children }: { children: React.ReactNode }) => (
    <div className={'rei-ontop-transparent-card ' + styles.card}>
        <div className={styles.wordingContainer}>{children}</div>
    </div>
)

export default OnTopCard
