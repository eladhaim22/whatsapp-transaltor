import * as translate from 'translatte';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationService {
  async translateHebrewToEs(text: string): Promise<string> {
    const translateObject = await translate(text, { to: 'es' });
    return translateObject.text;
  }
}
