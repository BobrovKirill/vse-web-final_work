import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
    try {
        const data = localStorage.getItem('favorites')
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

const useFavoritesStore = createSlice({
    name: 'favorites',
    initialState: {
        list: loadFromStorage(),
    },
    reducers: {
        addFavorite(state, action) {
            const exists = state.list.some(item => item.id === action.payload.id)
            if (!exists) {
                state.list.push(action.payload)
                localStorage.setItem('favorites', JSON.stringify(state.list))
            }
        },
        removeFavorite(state, action) {
            state.list = state.list.filter(item => item.id !== action.payload)
            localStorage.setItem('favorites', JSON.stringify(state.list))
        },
    },
})

export const { addFavorite, removeFavorite } = useFavoritesStore.actions
export default useFavoritesStore.reducer