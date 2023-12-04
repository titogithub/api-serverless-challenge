import { buildClassValidatorError } from '../../common/middleware/middyErrorHandler.middleware';
import { ORMConnection } from '../../infrastructure/ORMConnection';
import { EnvService } from '../../services/env.service';

export type TDBStatus = 'ok' | 'failed' | 'skipped';

export interface IHealthCheck {
  lambdaStatus: 'ok';
  dbStatus: TDBStatus;
  envStatus: 'ok' | 'failed';
}

export interface Dependencies {
  envService: EnvService;
  connectionInstance: ORMConnection;
}

const testDBConn = async (connection: ORMConnection): Promise<TDBStatus> => {
  let dbStatus;

  try {
    await (await connection.getConn()).query('SELECT VERSION()');
    dbStatus = 'ok';
  } catch (error) {
    console.log({ error });
    dbStatus = 'failed';
  }

  return dbStatus;
};

export const get =
  ({ envService, connectionInstance }: Dependencies) =>
  async (): Promise<IHealthCheck> => {
    const shouldLog = ['local', 'test'].includes(envService.getNodeEnv());
    let envStatus: 'ok' | 'failed';
    if (shouldLog) {
      console.log('envService', JSON.stringify(envService, null, 4));
    }

    const lambdaStatus = await Promise.resolve({ status: 'ok' });
    const dbStatus = await testDBConn(connectionInstance);

    try {
      await envService.validate();
      envStatus = 'ok';
    } catch (error) {
      envStatus = 'failed';
      const { reasons } = buildClassValidatorError(error, true);
      console.log('env errors: ', reasons);
    }

    return {
      lambdaStatus: lambdaStatus.status as 'ok',
      dbStatus,
      envStatus,
    };
  };
