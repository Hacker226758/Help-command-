const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the bot',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Load admin UIDs from admins.json
    let adminUids = [];
    try {
      const data = fs.readFileSync('ad.json'); // Assuming admins.json is in the same directory
      adminUids = JSON.parse(data).admins;
    } catch (error) {
      console.error('Error loading admin IDs:', error);
      sendMessage(senderId, { text: 'An error occurred while retrieving the admin list. Please try again later.' }, pageAccessToken);
      return;
    }

    // Check if the sender is an admin
    if (!adminUids.includes(senderId.toString())) {
      sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
      return;
    }

    // Get the user ID to ban
    const targetUserId = args[0];
    if (!targetUserId) {
      sendMessage(senderId, { text: 'Please provide the user ID to ban.' }, pageAccessToken);
      return;
    }

    // Load the banned users list from a file (or use your bot's framework's storage)
    let bannedUsers = [];
    try {
      const data = fs.readFileSync('banned_users.json'); // Assuming banned_users.json is in the same directory
      bannedUsers = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist, create an empty array
      if (error.code === 'ENOENT') {
        bannedUsers = [];
      } else {
        console.error('Error loading banned users:', error);
        sendMessage(senderId, { text: 'An error occurred while retrieving the banned users list. Please try again later.' }, pageAccessToken);
        return;
      }
    }

    // Check if the user is already banned
    if (bannedUsers.includes(targetUserId)) {
      sendMessage(senderId, { text: `User ${targetUserId} is already banned.` }, pageAccessToken);
      return;
    }

    // Add the user to the banned users list
    bannedUsers.push(targetUserId);

    // Save the updated banned users list to the file (or use your bot's framework's storage)
    try {
      fs.writeFileSync('banned_users.json', JSON.stringify(bannedUsers));
      sendMessage(senderId, { text: `User ${targetUserId} has been banned.` }, pageAccessToken);
    } catch (error) {
      console.error('Error saving banned users:', error);
      sendMessage(senderId, { text: 'An error occurred while saving the banned users list. Please try again later.' }, pageAccessToken);
    }
  }
};
    
