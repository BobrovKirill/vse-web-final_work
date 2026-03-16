import { useNavigate } from 'react-router-dom'
import TheatersIcon from '@mui/icons-material/Theaters'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import styles from './style.module.css'
import { Link } from 'react-router-dom'

const FEATURES = [
    {
        icon: <TheatersIcon sx={{ fontSize: 28 }} />,
        title: 'Каталог фильмов',
        description: 'Тысячи фильмов с рейтингами и описаниями',
        to: '/movies',
    },
    {
        icon: <SearchIcon sx={{ fontSize: 28 }} />,
        title: 'Поиск',
        description: 'Найдите любой фильм по названию',
        to: '/search',
    },
    {
        icon: <FavoriteBorderIcon sx={{ fontSize: 28 }} />,
        title: 'Избранное',
        description: 'Сохраняйте фильмы для быстрого доступа',
        to: '/favorites',
    },
    {
        icon: <StarBorderIcon sx={{ fontSize: 28 }} />,
        title: 'Рейтинги',
        description: 'Оценки Кинопоиска и IMDb на каждой карточке',
        to: '/movies',
    },
]

function Home() {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <div className={styles.hero}>
                <h1 className={styles.title}>КиноSpace</h1>
                <p className={styles.subtitle}>
                    Исследуйте мир кино — рейтинги, описания и ваша личная коллекция
                </p>
                <div className={styles.heroActions}>
                    <button className={styles.primaryBtn} onClick={() => navigate('/movies')}>
                        Смотреть каталог
                    </button>
                    <button className={styles.secondaryBtn} onClick={() => navigate('/search')}>
                        Найти фильм
                    </button>
                </div>
            </div>

            <div className={styles.features}>
                {FEATURES.map(({ icon, title, description, to }) => (
                    <Link key={title} to={to} className={styles.featureCard}>
                        <div className={styles.iconBox}>{icon}</div>
                        <p className={styles.featureTitle}>{title}</p>
                        <p className={styles.featureDesc}>{description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home