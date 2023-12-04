import { AWS } from '@serverless/typescript';

import createEmpleado from '../src/handlers/empleado/create/sls';
import searchEmpleado from '../src/handlers/empleado/search/sls';

const functions: AWS['functions'] | Record<string, unknown> = {
  ...createEmpleado,
  ...searchEmpleado,
};

export default functions;
