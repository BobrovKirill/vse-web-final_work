import styles from './style.module.css'

function MovieCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.poster} />
            <div className={styles.info}>
                <div className={styles.line} />
                <div className={styles.lineShort} />
                <div className={styles.lineTiny} />
            </div>
        </div>
    )
}

export default MovieCardSkeleton