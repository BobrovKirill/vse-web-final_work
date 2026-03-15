import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { removeFavorite } from '../../store/favoritesSlice'
import EmptyState from '../../components/EmptyState'
import styles from './style.module.css'

function Favorites() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const favorites = useSelector(state => state.favorites.list)

    function handleRemove(e, id) {
        e.stopPropagation()
        dispatch(removeFavorite(id))
    }

    function handleClick(id) {
        navigate(`/movies/${id}`)
    }

    if (favorites.length === 0) {
        return <EmptyState message="Вы ещё не добавили фильмы в избранное" />
    }

    return (
        <div>
            <h1 className={styles.heading}>Избранное</h1>
            <div className={styles.list}>
                {favorites.map(movie => {
                    const { id, name, year, poster, rating, genres } = movie
                    const score = rating?.kp ?? rating?.imdb ?? 0
                    const genre = genres?.[0]?.name ?? ''
                    const posterUrl = poster?.url ?? poster?.previewUrl ?? null

                    return (
                        <div key={id} className={styles.card} onClick={() => handleClick(id)}>
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
                            <button
                                className={styles.removeBtn}
                                onClick={(e) => handleRemove(e, id)}
                            >
                                <DeleteOutlineIcon sx={{ fontSize: 20 }} />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Favorites