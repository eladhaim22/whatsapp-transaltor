import config, { schema } from './configuration/configuration';

import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { TranslationModule } from './translation/translation.module';
import { ConfigurationWithValidatorModule } from './validation/validation.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    TranslationModule,
    WhatsappModule,
    ConfigurationWithValidatorModule.register({
      schema: schema,
      configuration: config,
    }),
    HealthcheckModule,
  ],
})
export class AppModule {}
