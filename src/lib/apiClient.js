import { runtimeConfig } from '../config/runtimeConfig'
import { ApiError, AuthenticationError, PermissionError, ServerError, ValidationError } from './apiErrors'

const SESSION_KEY = 'worknest_session'

function getToken() {
  try { return JSON.parse(window.localStorage.getItem(SESSION_KEY))?.token ?? null } catch { return null }
}

async function parseResponse(response) {
  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') ?? ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

function getMessage(payload, fallback) {
  return typeof payload === 'object' && payload?.message ? payload.message : fallback
}

function createHttpError(status, payload) {
  if (status === 401) return new AuthenticationError(getMessage(payload, 'Your session has expired. Please sign in again.'), payload)
  if (status === 403) return new PermissionError(getMessage(payload, 'You do not have permission to perform this action.'), payload)
  if (status === 422) return new ValidationError(getMessage(payload, 'Please check the submitted information.'), payload?.errors ?? payload)
  if (status >= 500) return new ServerError(getMessage(payload, 'The server could not complete the request.'), status, payload)
  return new ApiError(getMessage(payload, 'The request could not be completed.'), { status, details: payload })
}

async function request(path, options = {}) {
  const token = getToken()
  let response
  try {
    response = await fetch(`${runtimeConfig.apiBaseUrl}${path}`, {
      ...options,
      headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    })
  } catch (error) {
    throw new ApiError('Could not connect to the server.', { code: 'NETWORK_ERROR', details: error })
  }
  const payload = await parseResponse(response)
  if (!response.ok) {
    if (response.status === 401) {
      window.localStorage.removeItem(SESSION_KEY)
      window.dispatchEvent(new CustomEvent('worknest:unauthorized'))
    }
    throw createHttpError(response.status, payload)
  }
  return payload
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
