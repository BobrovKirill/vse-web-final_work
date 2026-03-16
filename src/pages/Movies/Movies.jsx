import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import { fetchMovies, setPage } from '../../store/useVoviesStore.js'
import MovieGrid from '../../components/MovieGrid'
import ErrorMessage from '../../components/ErrorMessage'
import styles from './style.module.css'

function Movies() {
    const dispatch = useDispatch()
    const { list, total, page, loading, error } = useSelector(state => state.movies)

    const totalPages = Math.ceil(total / 20)

    useEffect(() => {
        dispatch(fetchMovies(page))
    }, [dispatch, page])

    function handlePageChange(_, value) {
        dispatch(setPage(value))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    return (
        <div>
            <h1 className={styles.heading}>Фильмы</h1>
            <MovieGrid movies={list} loading={loading} />
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'var(--text-accent)',
                                background: 'var(--bg-card)',
                                boxShadow: 'var(--shadow-badge)',
                            },
                            '& .Mui-selected': {
                                background: 'var(--bg-card-inner) !important',
                                color: 'var(--text-primary)',
                            },
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Movies