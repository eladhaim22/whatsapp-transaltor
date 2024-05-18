export const buildWhatsAppQrTemplate = (imagePath: string) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Scan for whatsapp web login',
      },
      accessory: {
        type: 'image',
        image_url: imagePath,
        alt_text: 'qr image',
      },
    },
  ],
});
