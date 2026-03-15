import EmptyState from './EmptyState'

export default {
    title: 'UI/EmptyState',
    component: EmptyState,
}

export const Default = {}

export const Favorites = {
    args: {
        message: 'Вы ещё не добавили фильмы в избранное',
    },
}

export const SearchEmpty = {
    args: {
        message: 'По вашему запросу ничего не найдено',
    },
}