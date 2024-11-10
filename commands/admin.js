const axios = require('axios');

module.exports = {
  name: 'admin',
  description: 'Get a list of bot admins',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Inform the user that the list of admins is being retrieved
    sendMessage(senderId, { text: 'Retrieving list of admins... Please wait.' }, pageAccessToken);
    try {
      // Replace with your actual admin list
      const admins = ['Aljur Pogoy','John Smith','Jun jaam'];
      // Send the list of admins to the user
      sendMessage(senderId, { text: `Bot Admins:\n\n${admins.join('\n')}` }, pageAccessToken);
    } catch (error) {
      console.error('Error retrieving admin list:', error);
      sendMessage(senderId, { text: 'There was an error retrieving the list of admins. Please try again later.' }, pageAccessToken);
    }
  }
};
