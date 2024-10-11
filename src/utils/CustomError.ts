import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly, because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
