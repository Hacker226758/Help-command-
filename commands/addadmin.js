const fs = require('fs');
const path = require('path');

const verificationCode = '-kazutoxbsk0'; // Verification code

module.exports = {
  name: 'addadmin',
  description: 'Adds a user to the admin list (requires verification code).',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    if (args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide the verification code.' }, pageAccessToken);
      return;
    }

    const providedCode = args[0];
    if (providedCode !== verificationCode) {
      await sendMessage(senderId, { text: 'Incorrect verification code.' }, pageAccessToken);
      return;
    }

    try {
      const adminsFilePath = path.join(__dirname, '..', 'admins.json');
      const adminsData = JSON.parse(fs.readFileSync(adminsFilePath, 'utf8'));
      if (!adminsData.admins) {
          adminsData.admins = [];
      }
      if (adminsData.admins.includes(senderId)) {
          await sendMessage(senderId, { text: 'You are already an admin.' }, pageAccessToken);
          return;
      }
      adminsData.admins.push(senderId);
      fs.writeFileSync(adminsFilePath, JSON.stringify(adminsData, null, 2));
      await sendMessage(senderId, { text: 'You have been added to the admin list.' }, pageAccessToken);
    } catch (error) {
      console.error('Error adding admin:', error);
      await sendMessage(senderId, { text: 'An error occurred while adding you to the admin list.' }, pageAccessToken);
    }
  }
};
