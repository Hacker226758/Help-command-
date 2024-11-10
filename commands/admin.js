const axios = require('axios');
const fs = require('fs'); // Import fs for reading admins.json

module.exports = {
  name: 'admin',
  description: 'Get a list of bot admins',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Load admin UIDs from admins.json
    let adminUids = [];
    try {
      const data = fs.readFileSync('admins.json'); // Assuming admins.json is in the same directory
      adminUids = JSON.parse(data).admins;
    } catch (error) {
      console.error('Error loading admin IDs:', error);
      sendMessage(senderId, { text: 'An error occurred while retrieving the admin list. Please try again later.' }, pageAccessToken);
      return;
    }

    // Check if the sender is an admin
    if (!adminUids.includes(senderId)) {
      sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
      return;
    }

    // Inform the user that the list of admins is being retrieved
    sendMessage(senderId, { text: 'Retrieving list of admins... Please wait.' }, pageAccessToken);

    try {
      // Send the list of admins to the user
      sendMessage(senderId, { text: `Bot Admins:\n\n${adminUids.join('\n')}` }, pageAccessToken);
    } catch (error) {
      console.error('Error retrieving admin list:', error);
      sendMessage(senderId, { text: 'There was an error retrieving the list of admins. Please try again later.' }, pageAccessToken);
    }
  }
};
      
