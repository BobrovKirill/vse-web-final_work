import ErrorMessage from './ErrorMessage'

export default {
    title: 'UI/ErrorMessage',
    component: ErrorMessage,
}

export const Default = {}

export const CustomMessage = {
    args: {
        message: 'Не удалось загрузить список фильмов',
    },
}

export const NetworkError = {
    args: {
        message: 'Ошибка сети. Проверьте подключение к интернету.',
    },
}