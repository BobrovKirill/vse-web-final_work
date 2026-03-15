import { useNavigate } from 'react-router-dom'
import TheatersIcon from '@mui/icons-material/Theaters'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import styles from './style.module.css'

const FEATURES = [
    {
        icon: <TheatersIcon sx={{ fontSize: 28 }} />,
        title: 'Каталог фильмов',
        description: 'Тысячи фильмов с рейтингами и описаниями',
    },
    {
        icon: <SearchIcon sx={{ fontSize: 28 }} />,
        title: 'Поиск',
        description: 'Найдите любой фильм по названию',
    },
    {
        icon: <FavoriteBorderIcon sx={{ fontSize: 28 }} />,
        title: 'Избранное',
        description: 'Сохраняйте фильмы для быстрого доступа',
    },
    {
        icon: <StarBorderIcon sx={{ fontSize: 28 }} />,
        title: 'Рейтинги',
        description: 'Оценки Кинопоиска и IMDb на каждой карточке',
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
                {FEATURES.map(({ icon, title, description }) => (
                    <div key={title} className={styles.featureCard}>
                        <div className={styles.iconBox}>{icon}</div>
                        <p className={styles.featureTitle}>{title}</p>
                        <p className={styles.featureDesc}>{description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home