// api.ts

export interface ApiError {
    code: number
    message: string
    details?: Record<string, unknown>
}

export const api = {
    get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : ''
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
    },

    post: async <T>(url: string, data: Record<string, any>): Promise<T> => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
    },

    put: async <T>(url: string, data: Record<string, any>): Promise<T> => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
    },

    delete: async (url: string): Promise<void> => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    }
}