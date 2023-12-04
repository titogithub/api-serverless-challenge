import { AWS } from '@serverless/typescript';

import { DEFAULT_CORS_SETTINGS } from '../../../common/APIRequests';

const lambda: AWS['functions'] | Record<string, unknown> = {
  getEmpleados: {
    handler: 'src/handlers/empleado/search/handler.handler',
    events: [
      {
        http: {
          swaggerTags: ['Empleado'],
          // NOTE: used post to facilitate parsing and request validation with Class Validator
          // Could also be a GET endpoint converting query params to a search object
          method: 'post',
          path: 'empleado/search',
          cors: DEFAULT_CORS_SETTINGS,
          bodyType: 'TSearchEmpleado',
          responseData: {
            200: {
              bodyType: 'TGetEmpleados',
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
