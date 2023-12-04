import * as YAML from 'yamljs';

import { IEnvProperties } from '../../src/services/env.service';

const environment: IEnvProperties = YAML.load(
  `./environment/env.${process.env.NODE_ENV}.yml`,
);

const serverlessConfig = {
  stage: environment.stageName,
  region: environment.awsRegion,
  timeout: 30,
  environment: {
    NODE_ENV: process.env.NODE_ENV,
    RDS_APP_PORT: '' + environment.port,
    RDS_LOGGING: '' + environment.db.myDB.logging,
    RDS_POSTGRES_DB_NAME: environment.db.myDB.database,
    RDS_POSTGRES_DB_PORT: '' + environment.db.myDB.port,
    RDS_PSQL_DB_TYPE: environment.db.myDB.type,
    RDS_POSTGRES_ENDPOINT: environment.db.myDB.host,
    RDS_POSTGRES_PASSWORD: environment.db.myDB.password,
    RDS_POSTGRES_USER: environment.db.myDB.username,
    STAGE_NAME: environment.stageName,
    AWS_REGION_NAME: environment.awsRegion,
  },
  iam: {
    role: {
      statements: [
        {
          Effect: 'Allow',
          Action: ['lambda:*'],
          Resource: '*',
        },
      ],
    },
  },
};

export default serverlessConfig;

export type AwsRegion = 'us-east-1';
