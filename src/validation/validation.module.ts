import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ConfigurationValidator,
  ConfigurationValidatorOptionsToken,
} from './configuration.validator';

import { z } from 'zod';
import { ConfigurationWithValidatorOptions } from './interfaces';

const schemaForType =
  <M>() =>
  <S extends z.ZodType<M, any, any>>(arg: S) => {
    return arg;
  };

const ConfigurationProvider = {
  provide: ConfigService,
  useClass: ConfigService,
};

@Global()
@Module({})
export class ConfigurationWithValidatorModule {
  static register<T extends ConfigurationWithValidatorOptions<any>>(
    options: T,
  ) {
    return {
      module: ConfigurationWithValidatorModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [options.configuration],
          ignoreEnvFile: true,
          ignoreEnvVars: true,
        }),
      ],
      providers: [
        {
          provide: ConfigurationValidatorOptionsToken,
          useValue: {
            schema: schemaForType<T>()(options.schema),
            configuration: options.configuration(),
          },
        },
        ConfigurationProvider,
        ConfigurationValidator,
      ],
      exports: [ConfigurationProvider],
    };
  }
}
