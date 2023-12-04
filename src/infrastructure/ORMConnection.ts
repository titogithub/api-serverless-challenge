/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, EntitySchema } from 'typeorm';

import * as entities from './entities/';

import { EnvService } from '../services/env.service';
export type TAvailableDBs = 'my-db';

export class ORMConnection {
  private dataSource: DataSource;
  static instance: ORMConnection;

  private constructor(envService: EnvService) {
    const dbConfig = envService.getDBConfig();
    this.dataSource = new DataSource({
      ...dbConfig,
      type: dbConfig.type as 'postgres',
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: Object.values(entities) as unknown as EntitySchema[],
    });
  }

  static getInstance(envService: EnvService): ORMConnection {
    if (!this.instance) {
      this.instance = new ORMConnection(envService);
    }
    return this.instance;
  }

  public getConn(): Promise<DataSource> {
    return this.dataSource.initialize();
  }

  static async killInstances(): Promise<void> {
    this.instance.dataSource.isInitialized &&
      (await this.instance.dataSource.destroy());
  }
}
