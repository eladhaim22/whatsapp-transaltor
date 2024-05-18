import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigObject } from '@nestjs/config';
import { z } from 'zod';

export const ConfigurationValidatorOptionsToken =
  'ConfigurationValidatorOptions';
interface ConfigurationValidatorOptions<M> {
  configuration: M;
  schema: z.ZodType<M, any, any>;
}

@Injectable()
export class ConfigurationValidator<M extends ConfigObject>
  implements OnModuleInit
{
  constructor(
    @Inject(ConfigurationValidatorOptionsToken)
    private readonly options: ConfigurationValidatorOptions<M>,
  ) {}

  async onModuleInit() {
    await this.options.schema.parseAsync(this.options.configuration);
  }
}
