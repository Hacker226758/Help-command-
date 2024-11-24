const axios = require('axios');

module.exports = {
name: 'countdown',
  description: 'Set a countdown timer',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    const seconds = parseInt(args[0]) || 10; // Default to 10 seconds
    sendMessage(senderId, { text: `Starting countdown for ${seconds} seconds...` }, pageAccessToken);
    let counter = seconds;
    const intervalId = setInterval(() => {
      sendMessage(senderId, { text: `${counter}...` }, pageAccessToken);
      counter--;
      if (counter < 0) {
        clearInterval(intervalId);
        sendMessage(senderId, { text: 'Time's up!' }, pageAccessToken);
      }
    }, 1000);
  },