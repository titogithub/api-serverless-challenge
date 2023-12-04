import type { AWS } from '@serverless/typescript';

import { config } from './doc/autoswagger';
import serverlessConfig from './serverless/configs/serverless.config';
import functions from './serverless/functions';

const { stage, region, timeout, environment, iam } = serverlessConfig;

export const serverlessConfiguration: AWS & { custom: unknown } = {
  service: 'template-api',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceInclude: ['pg'],
      },
      keepOutputDirectory: true,
    },
    autoswagger: config,
  },
  plugins: [
    'serverless-auto-swagger',
    'serverless-webpack',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    memorySize: 512,
    stage,
    region: region as unknown as 'us-east-1',
    timeout,
    profile: process.env.AWS_PROFILE,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment,
    iam,
    lambdaHashingVersion: '20201221',
    versionFunctions: false,
    tracing: {
      lambda: true,
      apiGateway: true,
    },
  },
  functions,
};

module.exports = serverlessConfiguration;
