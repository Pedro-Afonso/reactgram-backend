class AppError extends Error {
  errorCode: number
  statusCode: number

  constructor(statusCode: number, message?: string, errorCode = 0) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
  }
}

export { AppError }
