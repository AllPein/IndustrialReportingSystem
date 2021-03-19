import Joi from 'joi';
import express from 'express';
import httpStatus from 'http-status';

class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const pick = (object: Object, keys: PropertyKey[]): Object => {
  return keys.reduce((obj: Object, key) => {
    if (object && object.hasOwnProperty(key)) {
      // @ts-ignore
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const validate = (schema: Joi.ObjectSchema) => (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema).validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value)
  return next()
};

express().use;

Joi.object().keys;
