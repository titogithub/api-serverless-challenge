import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as migrations from './migrations';

import * as entities from '../src/infrastructure/entities';
import { EnvService } from '../src/services/env.service';

const envService = EnvService.getInstance();

export const migrationDatasource = new DataSource({
  ...envService.getDBConfig(),
  type: envService.getDBConfig().type as 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  entities: Object.values(entities),
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: Object.values(migrations),
});
