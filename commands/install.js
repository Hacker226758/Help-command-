const fs = require('fs');
const path = require('path');

const adminFile = 'admins.json';
let adminUids = [];

try {
  const data = fs.readFileSync(adminFile);
  adminUids = JSON.parse(data).admins;
} catch (error) {
  console.error('Error loading admin IDs:', error);
  // Handle error appropriately (e.g., log, use default admins, etc.)
  adminUids = ['defaultAdminId']; // Replace 'defaultAdminId' with a suitable ID
}

module.exports = {
  name: 'install',
  description: 'Install a new command (Admin Only)',
  author: 'Your Name',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    console.log('Sender ID:', senderId);
    console.log('Admin UIDs:', adminUids);

    if (!adminUids.includes(senderId)) {
      sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
      return;
    }

    const commandName = args[0];
    if (!commandName) {
      sendMessage(senderId, { text: 'Please provide a command name.' }, pageAccessToken);
      return;
    }

    // Validate command name (optional, but recommended)
    const validCommandNameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscores only
    if (!validCommandNameRegex.test(commandName)) {
      sendMessage(senderId, { text: 'Invalid command name. Use only alphanumeric characters and underscores.' }, pageAccessToken);
      return;
    }


    const commandPath = path.join(__dirname, '..', 'commands', `${commandName}.js`);

    if (fs.existsSync(commandPath)) {
      sendMessage(senderId, { text: `Command ${commandName} already exists.` }, pageAccessToken);
      return;
    }

    const commandCode = args.slice(1).join(' ');
    if (!commandCode) {
      sendMessage(senderId, { text: 'Please provide the command code.' }, pageAccessToken);
      return;
    }

    try {
      fs.writeFileSync(commandPath, commandCode);
      sendMessage(senderId, { text: `Command ${commandName} installed successfully.` }, pageAccessToken);
    } catch (error) {
      console.error('Error installing command:', error);
      sendMessage(senderId, { text: `Error installing command: ${error.message}` }, pageAccessToken); // More informative error message
    }
  }
};
