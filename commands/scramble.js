const axios = require('axios');

module.exports = {
name: 'scramble',
  description: 'Scramble a word',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    const word = args.join(' ');
    if (word === "") {
      sendMessage(senderId, { text: "Usage: /scramble <word>" }, pageAccessToken);
      return;
    }
    const scrambledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    sendMessage(senderId, { text: `Scrambled word: ${scrambledWord}` }, pageAccessToken);
  },