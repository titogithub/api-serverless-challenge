import 'reflect-metadata';

import middy from '@middy/core';
import cors from '@middy/http-cors';
import type { APIGatewayProxyResult, Handler } from 'aws-lambda';

import { get } from './process';

import {
  APIGatewayEventWithDBConnection,
  middyConnectionHandler,
} from '../../common/middleware/middyConnectionHandler.middleware';

const getHealthCheck: Handler = async (
  event: APIGatewayEventWithDBConnection,
): Promise<APIGatewayProxyResult> => {
  const response = await get({
    envService: event.envService,
    connectionInstance: event.connection,
  })();

  return { body: JSON.stringify(response), statusCode: 200 };
};

const handler = middy(getHealthCheck).use(middyConnectionHandler()).use(cors());

export { handler };
