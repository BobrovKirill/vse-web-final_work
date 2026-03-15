import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import styles from './style.module.css'

function ErrorMessage({ message = 'Что-то пошло не так...' }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <ErrorOutlineIcon sx={{ fontSize: 40, color: 'var(--text-secondary)' }} />
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    )
}

export default ErrorMessage