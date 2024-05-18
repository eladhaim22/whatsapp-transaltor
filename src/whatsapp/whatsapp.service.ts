import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';

import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NotificationService } from '../notification/notification.service';
import { TranslationService } from '../translation/translation.service';

const CHAT_ID_DESTINATION = {
  EITAN: '3A48DAF5FDBAAFAAE1AF',
  TEO: '3A48DAF5FDBAAFAAE1AF',
};

const CHAT_ID_ORIGIN = {
  EITAN: '1',
  TEO: '2',
};

const CHAT_ID_MAPPING = {
  [CHAT_ID_ORIGIN.EITAN]: CHAT_ID_DESTINATION.EITAN,
  [CHAT_ID_ORIGIN.TEO]: CHAT_ID_DESTINATION.TEO,
};

@Injectable()
export class WhatsappService implements OnApplicationBootstrap {
  private client: Client;
  constructor(
    private translationService: TranslationService,
    private notificationService: NotificationService,
    private configService: ConfigService,
  ) {
    this.client = new Client({
      webVersionCache: {
        type: 'remote',
        remotePath:
          'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
      },
      authStrategy: new LocalAuth({
        dataPath: this.configService.get('config.whatsAppAuthFolder'),
      }),
      puppeteer: {
        headless: true,
      },
    });
    this.client.on('qr', this.qrCodeReceived.bind(this));

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('message', this.messageReceived.bind(this));
  }

  async onApplicationBootstrap() {
    await this.client.initialize();
  }

  async qrCodeReceived(qr: string) {
    console.log('QR RECEIVED', qr);
    const element = await this.client.pupPage.$(`div[data-ref='${qr}']`);
    await element.screenshot({
      path: join(__dirname, '../static/example.png'),
    });
    await this.notificationService.uploadFile(
      'qr.code.png',
      join(__dirname, '../static/example.png'),
      'C0185JW5SB1',
    );
  }

  async messageReceived(msg: any) {
    const message = JSON.stringify(msg);
    await this.notificationService.sendMessage('C0185JW5SB1', message);
    /*const chatId = await msg.getChat();
    if (Object.keys(CHAT_ID_MAPPING).includes(chatId.id._serialized)) {
      const { body } = msg;
      const translatedMessage =
        await this.translationService.translateHebrewToEs(body);
      await this.client.sendMessage(
        CHAT_ID_DESTINATION[chatId.id._serialized],
        translatedMessage,
      );
    }*/
  }
}
