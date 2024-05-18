import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { TranslationModule } from '../translation/translation.module';
import { WhatsappService } from './whatsapp.service';

@Module({
  imports: [TranslationModule, NotificationModule],
  exports: [WhatsappService],
  providers: [WhatsappService],
})
export class WhatsappModule {}
