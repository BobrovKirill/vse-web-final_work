# КиноSpace

Приложение для просмотра каталога фильмов на основе данных Кинопоиска.

## Задача

Проект создан как финальная работа к курсу "Веб-разработка и дизайн интерфейсов"

## Стенд проект

Проект задеплоен на GitHub Pages:  
[https://bobrovkirill.github.io/vse-web-final_work](https://bobrovkirill.github.io/vse-web-final_work)

## Стек

- React 18
- React Router v6
- Redux Toolkit
- Material UI v5
- Storybook
- ESLint + Prettier
- Vite

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Превью продакшен сборки |
| `npm run deploy` | Деплой на GitHub Pages |
| `npm run storybook` | Запуск Storybook |
| `npm run build-storybook` | Сборка Storybook |
| `npm run lint` | Проверка линтером |
| `npm run lint:fix` | Автоисправление ошибок |
| `npm run format` | Форматирование кода |

## Функционал

- Каталог фильмов с пагинацией
- Поиск фильмов по названию с debounce
- Страница фильма с подробной информацией и рейтингом
- Избранное с сохранением в LocalStorage
- Счётчик избранного в навигации

## Переменные окружения

Создай `.env` файл в корне проекта:
```
VITE_API_URL=/api
VITE_API_TOKEN=твой_токен
```

Токен можно получить на [kinopoisk.dev](https://kinopoisk.dev).

## API

Проект использует [Kinopoisk Dev API](https://kinopoisk.dev).

| Endpoint | Описание |
|---|---|
| `GET /movie?page=1&limit=20` | Список фильмов |
| `GET /movie/:id` | Фильм по ID |
| `GET /movie?name=query` | Поиск по названию |

## Обёртка для API

Файл `src/services/useApi.js` — обёртка над `fetch` с поддержкой всех HTTP методов, автоматической подстановкой токена и обработкой ошибок.
```js
const useApi = () => createApi()
```

### Методы

| Метод | Описание |
|---|---|
| `api.get(endpoint)` | GET запрос |
| `api.post(endpoint, body)` | POST запрос |
| `api.put(endpoint, body)` | PUT запрос |
| `api.patch(endpoint, body)` | PATCH запрос |
| `api.delete(endpoint)` | DELETE запрос |

### Пример использования
```js
import useApi from '../services/useApi'

const api = useApi()

// получить список фильмов
const data = await api.get('/movie?page=1&limit=20')

// получить фильм по id
const movie = await api.get('/movie/123')

// обработка ошибок
try {
  const data = await api.get('/movie')
} catch (error) {
  console.log(error.status)   // HTTP статус
  console.log(error.message)  // текст ошибки
}
```

В Redux thunk:
```js
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
```