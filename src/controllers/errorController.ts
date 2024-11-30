import { AppError } from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

const handleUniqueConstraintError = (err: Prisma.PrismaClientKnownRequestError): AppError => {
  const field = err.meta?.target as string[];
  const message = `Duplicate field value: ${field.join(', ')}. Please use another value!`;
  return new AppError(message, 400);
};


const handleValidationError = (err: Prisma.PrismaClientValidationError): AppError => {
  return new AppError('Invalid input data', 400);
};
const handleZodError = (err: ZodError): AppError => {
  const errors = err.errors.map(error => ({
    field: error.path[error.path.length - 1],
    message: error.message
  }));
  
  const message = errors.map(e => `${e.field}: ${e.message}`).join(', ');
  return new AppError(message, 400);
};
const handleJWTError = (): AppError => 
  new AppError("Invalid login. Please login again.", 401);


const handleJWTExpiredError = (): AppError => 
  new AppError("Token expired. Please login again.", 401);

const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};


const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = err as AppError;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let handledError = { ...error };
    handledError.message = error.message;
    if (err instanceof ZodError) {
      handledError = handleZodError(err);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      handledError = handleUniqueConstraintError(err);
    }
    if (err instanceof Prisma.PrismaClientValidationError) {
      handledError = handleValidationError(err);
    }
    if (handledError.name === "JsonWebTokenError") {
      handledError = handleJWTError();
    }
    if (handledError.name === "TokenExpiredError") {
      handledError = handleJWTExpiredError();
    }


    sendErrorProd(handledError, req, res);
  }
};

export default errorHandler;