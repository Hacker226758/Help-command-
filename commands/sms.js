const axios = require('axios');
module.exports = {
  name: 'sms',
  description: 'Send SMS using API.',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const phoneNumber = args[0];
    const message = args.slice(1).join(' ');

    if (!phoneNumber || !message) {
      sendMessage(senderId, { text: 'Invalid format. Use: sms [phone number] [message]' }, pageAccessToken);
      return;
    }

    const apiUrl = `https://api.kenliejugarap.com/freesmslbc/?number=${encodeURIComponent(phoneNumber)}&message=${encodeURIComponent(message)}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status) {
        sendMessage(senderId, { text: 'SMS sent successfully!' }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: data.response }, pageAccessToken);
      }
    } catch (error) {
      sendMessage(senderId, { text: 'Error sending SMS. Please try again later.' }, pageAccessToken);
    }
  }
};
