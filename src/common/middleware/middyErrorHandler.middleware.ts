/* eslint-disable @typescript-eslint/no-explicit-any */
import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { HandlerLambda, MiddlewareObject } from 'middy';

import {
  ErrorResponseDTO,
  IErrorResponse,
} from '../../dtos/response/error-response.dto';

export function middyErrorHandler(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  const onError = async (
    request: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>,
  ): Promise<any> => {
    if (['dev', 'local', 'test'].includes(process.env.NODE_ENV)) {
      console.log('error handler middleware: ', request.error);
      console.log('name: ', request.error.name);
      console.log('message: ', request.error.message);
      console.log('stack: ', request.error.stack);
    }
    const { message, reasons, statusCode } = errorBuilder(request.error);
    request.response = {
      body: JSON.stringify({ reasons, message }),
      statusCode,
    };

    return Promise.resolve();
  };

  return {
    onError,
  };
}

export const isClassValidatorError = (error: any): boolean =>
  Array.isArray(error) && error.every((e) => e instanceof ValidationError);

export const isErrorResponseDTO = (error: any): boolean =>
  error instanceof ErrorResponseDTO;

export const buildClassValidatorError = (
  error: Array<ValidationError>,
  omitValue = false,
): IErrorResponse<any> => {
  const reasons: Array<string> = [];
  error.map((e) => ({
    property: e.property,
    value: omitValue || e.value,
    reason: handleClassValidatorReasons(e, reasons),
  }));
  return {
    statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    message: 'Unprocessable Entity',
    reasons,
  };
};

const errorBuilder = (error: any): IErrorResponse<any> => {
  if (isErrorResponseDTO(error)) {
    return error;
  }

  if (isClassValidatorError(error)) {
    return buildClassValidatorError(error);
  }

  return {
    message: error.message,
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
};

export const handleClassValidatorReasons = (
  error: ValidationError,
  reasons: Array<string> = [],
): void => {
  if (error.constraints) {
    reasons.push(...Object.values(error.constraints));
  }
  if (error.children) {
    error.children.map((ec) => handleClassValidatorReasons(ec, reasons));
  }
};
