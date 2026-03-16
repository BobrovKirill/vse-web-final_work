import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import useApi from '../services/useApi'

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (page = 1, { rejectWithValue }) => {
        const api = useApi()
        try {
            return await api.get(`/movie?page=${page}&limit=20`)
        } catch (error) {
            return rejectWithValue({
                status: error.status ?? 0,
                message: error.message ?? 'Ошибка сети',
            })
        }
    }
)

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async ({ query, page = 1 }, { rejectWithValue }) => {
        const api = useApi()
        try {
            return await api.get(`/movie?page=${page}&limit=20&name=${encodeURIComponent(query)}`)
        } catch (error) {
            return rejectWithValue({
                status: error.status ?? 0,
                message: error.message ?? 'Ошибка сети',
            })
        }
    }
)

export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
    async (id, { rejectWithValue }) => {
        const api = useApi()
        try {
            return await api.get(`/movie/${id}`)
        } catch (error) {
            return rejectWithValue({
                status: error.status ?? 0,
                message: error.message ?? 'Ошибка сети',
            })
        }
    }
)

const useVoviesStore = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        total: 0,
        page: 1,
        loading: false,
        error: null,
        current: null,
        loadingCurrent: false,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        clearMovies(state) {
            state.list = []
            state.total = 0
            state.page = 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.docs
                state.total = action.payload.total
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message ?? 'Ошибка загрузки'
            })
            .addCase(searchMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.docs
                state.total = action.payload.total
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message ?? 'Ошибка поиска'
            })
            .addCase(fetchMovieById.pending, (state) => {
                state.loadingCurrent = true
                state.error = null
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.loadingCurrent = false
                state.current = action.payload
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.loadingCurrent = false
                state.error = action.payload?.message ?? 'Ошибка загрузки фильма'
            })
    },
})

export const { setPage, clearMovies } = useVoviesStore.actions
export default useVoviesStore.reducer