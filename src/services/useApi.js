const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.kinopoisk.dev/v1'
console.log(import.meta.env.VITE_API_URL)

async function request(endpoint, options = {}) {
    const { method = 'GET', body, headers: extraHeaders } = options

    const token = import.meta.env.VITE_API_TOKEN

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'X-API-KEY': token }),
            ...extraHeaders,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        let errorBody = null

        try {
            errorBody = await response.json()
        } catch {
            const text = await response.text().catch(() => '')
            errorBody = { message: text || response.statusText }
        }

        throw {
            status: response.status,
            message:
                errorBody.detail ||
                errorBody.message ||
                errorBody.error ||
                response.statusText ||
                'Что-то пошло не так...',
            raw: errorBody,
        }
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}

function createApi() {
    return {
        async get(endpoint) {
            return request(endpoint)
        },

        async post(endpoint, body) {
            return request(endpoint, { method: 'POST', body })
        },

        async put(endpoint, body) {
            return request(endpoint, { method: 'PUT', body })
        },

        async patch(endpoint, body) {
            return request(endpoint, { method: 'PATCH', body })
        },

        async delete(endpoint) {
            return request(endpoint, { method: 'DELETE' })
        },
    }
}

const useApi = () => createApi()

export default useApi