import 'reflect-metadata';

import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { DBConfig, Environment, IAWSConfig } from '../env.service';

export class AWSconfigDTO implements IAWSConfig {
  @Expose()
  @IsDefined()
  @IsString()
  accessKeyId: string;

  @Expose()
  @IsDefined()
  @IsString()
  secretAccessKey: string;
}

export class DBConfigDTO implements DBConfig {
  @Expose()
  @IsDefined()
  @IsNumber()
  port: number;

  @Expose()
  @IsDefined()
  @IsString()
  username: string;

  @Expose()
  @IsDefined()
  @IsString()
  password: string;

  @Expose()
  @IsDefined()
  @IsBoolean()
  logging: boolean;

  @Expose()
  @IsDefined()
  @IsString()
  host: string;

  @Expose()
  @IsDefined()
  @IsString()
  database: string;

  @Expose()
  @IsDefined()
  @IsBoolean()
  synchronize: boolean;

  @Expose()
  @IsDefined()
  @IsString()
  type: string;
}

export class MyDBDTO {
  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => DBConfigDTO)
  myDB: DBConfigDTO;
}

export class EnvServiceDTO {
  @Expose()
  @IsDefined()
  @IsString()
  nodeEnv: Environment;

  @Expose()
  @IsDefined()
  @IsString()
  awsRegion: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  port: number;

  @Expose()
  @IsDefined()
  @ValidateNested()
  @Type(() => MyDBDTO)
  db: MyDBDTO;
}
