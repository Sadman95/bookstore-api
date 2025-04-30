import { ValidationError } from "express-validator"

class ApiError extends Error {
  statusCode: number
  errors?: ValidationError[]
  constructor(statusCode: number, message: string | undefined, errors: ValidationError[] = [] , stack = '') {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
