import { AWS } from '@serverless/typescript';

import { DEFAULT_CORS_SETTINGS } from '../../../common/APIRequests';

const lambda: AWS['functions'] | Record<string, unknown> = {
  createEmpleado: {
    handler: 'src/handlers/empleado/create/handler.handler',
    events: [
      {
        http: {
          swaggerTags: ['Empleado'],
          method: 'post',
          path: 'empleado',
          cors: DEFAULT_CORS_SETTINGS,
          bodyType: 'TCreateEmpleado',
          responseData: {
            201: {
              bodyType: 'TCreateEmpleado',
            },
            '4XX | 500': {
              description: 'Error Response',
              bodyType: 'ErrorResponse',
            },
          },
        },
      },
    ],
  },
};

export default lambda;
