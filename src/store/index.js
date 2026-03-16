import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './useVoviesStore.js'
import favoritesReducer from './useFavoritesStore.js'

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        favorites: favoritesReducer,
    },
})

export default store