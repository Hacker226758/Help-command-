const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'adminlist',
  description: 'Lists all current admins.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const adminsFilePath = path.join(__dirname, '..', 'admins.json');
      const adminsData = JSON.parse(fs.readFileSync(adminsFilePath, 'utf8'));
      const adminList = adminsData.admins || []; // Handle case where admins array is missing

      if (adminList.length === 0) {
        await sendMessage(senderId, { text: 'No admins are currently listed.' }, pageAccessToken);
      } else {
        const formattedList = adminList.map(adminId => `- ${adminId}`).join('\n');
        await sendMessage(senderId, { text: `Current Admins:\n${formattedList}` }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error getting admin list:', error);
      await sendMessage(senderId, { text: 'An error occurred while retrieving the admin list.' }, pageAccessToken);
    }
  }
};
