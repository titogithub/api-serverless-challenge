import cors from '@middy/http-cors';
import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import middy from 'middy';

import { create } from './process';
import { validate } from './request';

import {
  APIGatewayEventWithDBConnection,
  middyConnectionHandler,
} from '../../../common/middleware/middyConnectionHandler.middleware';
import { middyErrorHandler } from '../../../common/middleware/middyErrorHandler.middleware';
import { middyJsonParser } from '../../../common/middleware/middyJsonBodyParser.middleware';

const createEmpleado: Handler = async (
  event: APIGatewayEventWithDBConnection,
): Promise<APIGatewayProxyResult> => {
  const parsedAddress = await validate(event.body);
  const newAddress = await create({ ormConnection: event.connection })(
    parsedAddress,
  );

  return {
    body: JSON.stringify(newAddress),
    statusCode: StatusCodes.CREATED,
  };
};

const handler = middy(createEmpleado)
  .use(middyJsonParser())
  .use(middyConnectionHandler())
  .use(middyErrorHandler())
  .use(cors());

export { handler };
