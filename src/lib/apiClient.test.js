import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from './apiClient'
import { AuthenticationError, PermissionError, ServerError, ValidationError } from './apiErrors'

const failedResponse = (status, payload) => ({ ok: false, status, headers: { get: () => 'application/json' }, json: async () => payload })

describe('apiClient errors', () => {
  beforeEach(() => { window.localStorage.clear(); vi.restoreAllMocks() })

  it.each([
    [401, AuthenticationError],
    [403, PermissionError],
    [422, ValidationError],
    [500, ServerError],
  ])('maps HTTP %s to a specific error', async (status, ErrorType) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(failedResponse(status, { message: `HTTP ${status}`, errors: { name: ['Invalid'] } })))
    await expect(apiClient.get('/example')).rejects.toBeInstanceOf(ErrorType)
  })

  it('adds the stored bearer token to requests', async () => {
    window.localStorage.setItem('worknest_session', JSON.stringify({ token: 'secret-token' }))
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => ({ data: [] }) })
    vi.stubGlobal('fetch', fetchMock)
    await apiClient.get('/projects')
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/projects'), expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer secret-token' }) }))
  })
})
