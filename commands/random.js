const axios = require('axios');

module.exports = {
name: 'random',
  description: 'Generate a random number',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    const min = parseInt(args[0]) || 1; // Default minimum to 1
    const max = parseInt(args[1]) || 100; // Default maximum to 100
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    sendMessage(senderId, { text: `Your random number is: ${randomNumber}` }, pageAccessToken);
  },