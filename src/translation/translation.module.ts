import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Module({
  exports: [TranslationService],
  providers: [TranslationService],
})
export class TranslationModule {}
