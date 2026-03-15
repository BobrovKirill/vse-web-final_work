import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import styles from './style.module.css'

function MovieCard({ movie }) {
    const navigate = useNavigate()

    const { id, name, year, poster, rating, genres } = movie
    const score = rating?.kp ?? rating?.imdb ?? 0
    const genre = genres?.[0]?.name ?? ''
    const posterUrl = poster?.url ?? poster?.previewUrl ?? null

    function handleClick() {
        navigate(`/movies/${id}`)
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.poster}>
                {posterUrl
                    ? <img src={posterUrl} alt={name} className={styles.img} />
                    : <div className={styles.noImage}>нет постера</div>
                }
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{name}</p>
                <p className={styles.sub}>{year}{genre && ` · ${genre}`}</p>
                <div className={styles.ratingRow}>
                    <Rating
                        value={score / 2}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ color: '#8892b0' }}
                    />
                    <span className={styles.score}>{score.toFixed(1)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard