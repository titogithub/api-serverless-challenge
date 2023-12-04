import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as YAML from 'yamljs';

import { EnvServiceDTO } from './dto/env.dto';

export class EnvService implements IEnvironmentConfiguration {
  static instance: EnvService;

  private nodeEnv: Environment;
  private port: number;

  private db: IAbailableDBs;

  private awsRegion: string;

  private constructor() {
    this.nodeEnv = (process.env.NODE_ENV as Environment) || Environment.Local;

    const isNotLocal = this.nodeEnv !== Environment.Local;

    if (isNotLocal) {
      this.db = {
        myDB: {
          type: 'postgres',
          port: +process.env.RDS_POSTGRES_DB_PORT,
          username: process.env.RDS_POSTGRES_USER,
          password: process.env.RDS_POSTGRES_PASSWORD,
          logging: process.env.RDS_LOGGING === 'true',
          database: process.env.RDS_POSTGRES_DB_NAME,
          synchronize: false,
          host: process.env.RDS_POSTGRES_ENDPOINT,
        },
      };
      this.port = Number(process.env.RDS_APP_PORT);

      this.awsRegion = process.env.AWS_REGION_NAME;
    } else {
      const environment: IEnvProperties = YAML.load(
        `./environment/env.${this.nodeEnv}.yml`,
      );

      this.awsRegion = environment.awsRegion;

      this.port = environment.port;

      this.db = { myDB: environment.db.myDB };
    }
  }

  static getInstance(): EnvService {
    if (!this.instance) {
      this.instance = new EnvService();
    }

    return this.instance;
  }

  getDBConfig(): DBConfig {
    return this.db.myDB;
  }

  getPort(): number {
    return this.port;
  }

  getNodeEnv(): string {
    return this.nodeEnv;
  }

  getRegion(): string {
    return this.awsRegion;
  }

  isLocal(): boolean {
    return process.env.NODE_ENV === Environment.Local;
  }

  async validate(): Promise<void> {
    const parsedEnv = plainToInstance(EnvServiceDTO, this);
    await validateOrReject(parsedEnv, {
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
    });
  }
}

export interface IAWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
}

export enum Environment {
  Development = 'dev',
  Local = 'local',
  Production = 'prod',
  Test = 'test',
}

export interface DBConfig {
  port: number;
  username: string;
  password: string;
  logging: boolean;
  host: string;
  database: string;
  synchronize: boolean;
  type: string;
}

export interface IAbailableDBs {
  myDB: DBConfig;
}

export interface IEnvironmentConfiguration {
  getPort(): number;
  getRegion(): string;
  getNodeEnv(): string;
  getDBConfig(): DBConfig;
  isLocal(): boolean;
  validate(): Promise<void>;
}

export interface IEnvProperties {
  nodeEnv: Environment;
  awsRegion: string;
  port: number;
  stageName: string;
  db: IAbailableDBs;
}
