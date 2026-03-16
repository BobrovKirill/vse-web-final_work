import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { searchMovies, clearMovies, setPage } from '../../store/useVoviesStore.js'
import MovieGrid from '../../components/MovieGrid'
import ErrorMessage from '../../components/ErrorMessage'
import EmptyState from '../../components/EmptyState'
import styles from './style.module.css'

function Search() {
    const dispatch = useDispatch()
    const { list, loading, error } = useSelector(state => state.movies)
    const [query, setQuery] = useState('')

    useEffect(() => {
        return () => {
            dispatch(clearMovies())
        }
    }, [dispatch])

    useEffect(() => {
        if (!query.trim()) {
            dispatch(clearMovies())
            return
        }

        const timer = setTimeout(() => {
            dispatch(setPage(1))
            dispatch(searchMovies({ query: query.trim(), page: 1 }))
        }, 500)

        return () => clearTimeout(timer)
    }, [query, dispatch])

    function handleChange(e) {
        setQuery(e.target.value)
    }

    const showEmpty = !loading && !error && query.trim() && list.length === 0

    return (
        <div>
            <h1 className={styles.heading}>Поиск</h1>
            <div className={styles.inputWrapper}>
                <TextField
                    fullWidth
                    placeholder="Введите название фильма..."
                    value={query}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'var(--text-secondary)' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            background: 'var(--bg-card)',
                            borderRadius: 'var(--radius-card)',
                            boxShadow: 'var(--shadow-card)',
                            color: 'var(--text-primary)',
                            '& fieldset': { border: 'none' },
                        },
                        '& input::placeholder': { color: 'var(--text-secondary)' },
                    }}
                />
            </div>

            {error && <ErrorMessage message={error} />}
            {showEmpty && <EmptyState message="По вашему запросу ничего не найдено" />}
            {!error && !showEmpty && (
                <MovieGrid movies={list} loading={loading && !!query.trim()} />
            )}
        </div>
    )
}

export default Search