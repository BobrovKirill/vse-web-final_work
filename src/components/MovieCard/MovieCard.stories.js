import MovieCard from './MovieCard'

export default {
    title: 'UI/MovieCard',
    component: MovieCard,
}

const mockMovie = {
    id: 1,
    name: 'Дюна: Часть вторая',
    year: 2024,
    poster: {
        url: 'https://image.openmoviedb.com/kinopoisk-images/10835063/4a9f3de6-e4b8-4c43-8be5-e0ce23131314/orig',
    },
    rating: {
        kp: 8.5,
        imdb: 8.8,
    },
    genres: [{ name: 'фантастика' }],
}

const mockMovieNoPoster = {
    ...mockMovie,
    id: 2,
    name: 'Фильм без постера',
    poster: null,
}

export const Default = {
    args: {
        movie: mockMovie,
    },
}

export const NoPoster = {
    args: {
        movie: mockMovieNoPoster,
    },
}

export const LowRating = {
    args: {
        movie: {
            ...mockMovie,
            id: 3,
            name: 'Фильм с низким рейтингом',
            rating: { kp: 3.2 },
        },
    },
}