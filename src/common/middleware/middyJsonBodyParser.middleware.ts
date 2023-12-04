import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { HandlerLambda, MiddlewareObject } from 'middy';

import { ErrorResponseDTO } from '../../dtos/response/error-response.dto';

const ERROR_MESSAGE = 'Invalid JSON body';

export function middyJsonParser(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  const before = async (
    handler: HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>,
  ): Promise<void> => {
    if (handler.event.body) {
      try {
        handler.event.body = JSON.parse(handler.event.body);
      } catch (error) {
        throw new ErrorResponseDTO(ERROR_MESSAGE, StatusCodes.BAD_REQUEST);
      }
    }
  };

  return {
    before,
  };
}
