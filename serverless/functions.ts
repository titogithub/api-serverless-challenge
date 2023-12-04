import { AWS } from '@serverless/typescript';

const corsSettings = {
  headers: [
    'Content-Type',
    'X-Amz-Date',
    'Authorization',
    'X-Api-Key',
    'X-Amz-Security-Token',
    'X-Amz-User-Agent',
  ],
  allowCredentials: false,
  origin: '*',
};

import empleadoSLS from './empleado.sls';

const functions: AWS['functions'] | Record<string, unknown> = {
  ...empleadoSLS,
  getHealthCheck: {
    handler: 'src/handlers/get-health-check/handler.handler',
    events: [
      {
        http: {
          swaggerTags: ['Health'],
          method: 'get',
          path: 'health-check',
          cors: corsSettings,
        },
      },
    ],
  },
};

export default functions;
