import { ConfigFactory, ConfigObject } from '@nestjs/config';
import { ZodObject, ZodType, z } from 'zod';

export type ConfigFactoryReturnValue<T extends ConfigObject> = T | Promise<T>;

export type ConfigurationWithValidatorOptions<T extends ConfigObject> = {
  configuration: ConfigFactory<T>;
  schema: ZodType<T, any, T>;
};

export type AppConfigurationServiceType<
  M extends ZodObject<any, any, any, any, any>,
  S extends ZodObject<any, any, any, any, any> = M,
  L extends ZodObject<any, any, any, any, any> = M,
> = z.infer<M> & z.infer<S> & z.infer<L>;
