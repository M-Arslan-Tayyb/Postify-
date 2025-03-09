export class CustomError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class AuthenticationError extends CustomError {
    constructor(message: string = "Authentication failed", statusCode: number = 401) {
      super(message, statusCode);
    }
  }
  
  export class DatabaseError extends CustomError {
    constructor(message: string = "Database error", statusCode: number = 500) {
      super(message, statusCode);
    }
  }
  