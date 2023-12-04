import * as fs from 'fs';

const typesPath = './doc/types';

const typefiles = [];

fs.readdirSync(typesPath)
  .filter((file) => file.indexOf('.d.ts') !== 0)
  .forEach((file) => {
    typefiles.push(`${typesPath}/${file}`);
  });

export const config = {
  basePath: process.env.STAGE_NAME ? `/${process.env.STAGE_NAME}` : '/dev',
  typefiles: [...typefiles],
  generateSwaggerOnDeploy: true,
  apiType: 'http',
  apiKeyHeaders: ['Authorization'],
};
