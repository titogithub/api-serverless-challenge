import cors from '@middy/http-cors';
// eslint-disable-next-line import/no-unresolved
import { Handler, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import middy from 'middy';

import { searchEmpleado } from './process';
import { validate } from './request';

import {
  APIGatewayEventWithDBConnection,
  middyConnectionHandler,
} from '../../../common/middleware/middyConnectionHandler.middleware';
import { middyErrorHandler } from '../../../common/middleware/middyErrorHandler.middleware';
import { middyJsonParser } from '../../../common/middleware/middyJsonBodyParser.middleware';

const getEmpleados: Handler = async (
  event: APIGatewayEventWithDBConnection,
): Promise<APIGatewayProxyResult> => {
  const searchOptions = await validate(event.body);

  const empleado = await searchEmpleado({
    ormConnection: event.connection,
  })(searchOptions);

  return {
    body: JSON.stringify(empleado),
    statusCode: StatusCodes.OK,
  };
};

const handler = middy(getEmpleados)
  .use(middyJsonParser())
  .use(middyConnectionHandler())
  .use(middyErrorHandler())
  .use(cors());

export { handler };
