import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { ApiResponse } from '../responses/ApiResponse';

export const validateBody = <T>(cls: new () => T, extra?: (dto: T) => string | null): RequestHandler =>
  async (req, res, next) => {
    if(req.body === null || req.body === undefined){
      return res.status(400).json(new ApiResponse(false, 'Bad request', ''));
    }
    const dto = plainToInstance(cls, req.body) ;
    const errors = await validate(dto as object, { whitelist: true, forbidNonWhitelisted: true });
    let extraError: string | null = null;
    if (extra) extraError = extra(dto);
    if (errors.length || extraError) {
      return res.status(400).json(new ApiResponse(false, 'Validation failed', undefined, {
        errors,
        ...(extraError ? { extraError } : {}),
      }));
    }
    req.body = dto;
    next();
  };

export const dueDateNotPast = <T extends { dueDate?: string }>(dto: T) => {
  if (!dto.dueDate) return null;
  const due = new Date(dto.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (due < today) return 'Due date cannot be in the past.';
  return null;
};
