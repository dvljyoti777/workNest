export class ApiError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', details = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Your session has expired. Please sign in again.', details) { super(message, { status: 401, code: 'UNAUTHENTICATED', details }) }
}
export class PermissionError extends ApiError {
  constructor(message = 'You do not have permission to perform this action.', details) { super(message, { status: 403, code: 'FORBIDDEN', details }) }
}
export class ValidationError extends ApiError {
  constructor(message = 'Please check the submitted information.', details) { super(message, { status: 422, code: 'VALIDATION_ERROR', details }) }
}
export class ServerError extends ApiError {
  constructor(message = 'The server could not complete the request.', status = 500, details) { super(message, { status, code: 'SERVER_ERROR', details }) }
}
