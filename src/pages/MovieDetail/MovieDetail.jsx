import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Rating, CircularProgress, Chip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { fetchMovieById } from '../../store/moviesSlice'
import { addFavorite, removeFavorite } from '../../store/favoritesSlice'
import ErrorMessage from '../../components/ErrorMessage'
import styles from './style.module.css'

function MovieDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { current: movie, loadingCurrent, error } = useSelector(state => state.movies)
    const favorites = useSelector(state => state.favorites.list)
    const isFavorite = favorites.some(item => item.id === movie?.id)

    useEffect(() => {
        dispatch(fetchMovieById(id))
    }, [dispatch, id])

    function handleBack() {
        navigate(-1)
    }

    function handleFavorite() {
        if (isFavorite) {
            dispatch(removeFavorite(movie.id))
        } else {
            dispatch(addFavorite(movie))
        }
    }

    if (loadingCurrent) {
        return (
            <div className={styles.center}>
                <CircularProgress sx={{ color: 'var(--text-accent)' }} />
            </div>
        )
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    if (!movie) return null

    const score = movie.rating?.kp ?? movie.rating?.imdb ?? 0
    const posterUrl = movie.poster?.url ?? movie.poster?.previewUrl ?? null

    return (
        <div>
            <button className={styles.backBtn} onClick={handleBack}>
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Назад
            </button>

            <div className={styles.card}>
                <div className={styles.poster}>
                    {posterUrl
                        ? <img src={posterUrl} alt={movie.name} className={styles.img} />
                        : <div className={styles.noImage}>нет постера</div>
                    }
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>{movie.name}</h1>
                    {movie.alternativeName && (
                        <p className={styles.altTitle}>{movie.alternativeName}</p>
                    )}

                    <div className={styles.ratingRow}>
                        <Rating
                            value={score / 2}
                            precision={0.5}
                            readOnly
                            sx={{ color: '#8892b0' }}
                        />
                        <span className={styles.score}>{score.toFixed(1)}</span>
                    </div>

                    <div className={styles.meta}>
                        {movie.year && <span className={styles.metaItem}>{movie.year}</span>}
                        {movie.movieLength && (
                            <span className={styles.metaItem}>{movie.movieLength} мин</span>
                        )}
                        {movie.ageRating && (
                            <span className={styles.metaItem}>{movie.ageRating}+</span>
                        )}
                    </div>

                    {movie.genres?.length > 0 && (
                        <div className={styles.genres}>
                            {movie.genres.map(g => (
                                <Chip
                                    key={g.name}
                                    label={g.name}
                                    size="small"
                                    sx={{
                                        background: 'var(--bg-card-inner)',
                                        color: 'var(--text-accent)',
                                        boxShadow: 'var(--shadow-badge)',
                                        border: 'none',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {movie.description && (
                        <p className={styles.description}>{movie.description}</p>
                    )}

                    <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={handleFavorite}>
                            {isFavorite
                                ? <FavoriteIcon sx={{ fontSize: 18 }} />
                                : <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                            }
                            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                        </button>

                        {movie.externalId?.kpHD && (
                            <a
                            href={`https://www.kinopoisk.ru/film/${movie.externalId.kpHD}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.linkBtn}
                            >
                            <OpenInNewIcon sx={{ fontSize: 18 }} />
                            Кинопоиск
                            </a>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail