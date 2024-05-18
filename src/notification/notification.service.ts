import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';
import { createReadStream } from 'fs';

export class NotificationService {
  private webClient: WebClient;

  constructor(private configService: ConfigService) {
    this.webClient = new WebClient(this.configService.get('config.slackToken'));
  }

  async uploadFile(filename: string, filePath: string, channelId: string) {
    this.webClient.files.uploadV2({
      filename,
      file: createReadStream(filePath),
      channel_id: channelId,
    });
  }

  async sendMessage(channelId: string, message: string) {
    this.webClient.chat.postMessage({
      channel: channelId,
      text: message,
    });
  }
}
