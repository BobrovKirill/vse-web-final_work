import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TheatersIcon from '@mui/icons-material/Theaters'
import styles from './style.module.css'

const NAV_LINKS = [
    { to: '/', label: 'Главная', end: true },
    { to: '/movies', label: 'Фильмы' },
    { to: '/search', label: 'Поиск' },
    { to: '/favorites', label: 'Избранное' },
]

function Header() {
    const favoritesCount = useSelector(state => state.favorites.list.length)

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <TheatersIcon sx={{ fontSize: 28 }} />
                    <span className={styles.logoText}>КиноSpace</span>
                </div>
                <nav className={styles.nav}>
                    {NAV_LINKS.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.active}` : styles.link
                            }
                        >
                            {label === 'Избранное' && favoritesCount > 0
                                ? `${label} (${favoritesCount})`
                                : label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header