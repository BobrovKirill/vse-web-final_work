import InboxIcon from '@mui/icons-material/Inbox'
import styles from './style.module.css'

function EmptyState({ message = 'Ничего не найдено' }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <InboxIcon sx={{ fontSize: 40, color: 'var(--text-secondary)' }} />
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    )
}

export default EmptyState