const dataSource = import.meta.env.VITE_DATA_SOURCE ?? 'mock'

export const runtimeConfig = Object.freeze({
  dataSource,
  useApi: dataSource === 'api',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api').replace(/\/$/, ''),
})
