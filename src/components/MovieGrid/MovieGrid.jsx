import MovieCard from '../MovieCard'
import MovieCardSkeleton from '../MovieCardSkeleton'
import styles from './style.module.css'

function MovieGrid({ movies, loading }) {
    if (loading) {
        return (
            <div className={styles.grid}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <div className={styles.grid}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieGrid