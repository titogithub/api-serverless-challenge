import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HandlerLambda, MiddlewareObject } from 'middy';

import { ORMConnection } from '../../infrastructure/ORMConnection';
import { EnvService } from '../../services/env.service';

export interface APIGatewayEventWithDBConnection extends APIGatewayEvent {
  connection: ORMConnection;
  envService: EnvService;
}

export function middyConnectionHandler(): MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> {
  const before = async (
    handler: HandlerLambda<
      APIGatewayEventWithDBConnection,
      APIGatewayProxyResult
    >,
  ): Promise<void> => {
    const envServiceInstance = EnvService.getInstance();
    const ormInstance = ORMConnection.getInstance(envServiceInstance);

    if (!handler.event.envService) {
      handler.event.connection = ormInstance;
      handler.event.envService = envServiceInstance;
    }
  };

  const after = async (
    request: HandlerLambda<
      APIGatewayEventWithDBConnection,
      APIGatewayProxyResult
    >,
  ): Promise<void> => {
    if (request.event.envService) {
      await ORMConnection.killInstances();
    }
  };

  const onError = async (
    event: HandlerLambda<
      APIGatewayEventWithDBConnection,
      APIGatewayProxyResult
    >,
  ): Promise<void> => {
    if (event.event.connection) {
      await ORMConnection.killInstances();
    }
  };

  return {
    before,
    after,
    onError,
  };
}
