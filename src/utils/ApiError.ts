class ApiError extends Error {
  details: unknown;

  constructor(public readonly statusCode: number, message: string, details: unknown = null) {
    super(message);

    this.name = "ApiError";
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
