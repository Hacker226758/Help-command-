

const fs = require('fs');
const path = require('path');
const adminIds = ['100073129302064'];

module.exports = {
  name: 'install',
  description: 'Install a new command (Admins only)',
  author: 'Aljur Pogoy jun jaam',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Check if sender is an admin
    if (!adminIds.includes(senderId)) {
      sendMessage(senderId, { text: 'Only admins can use this command.' }, pageAccessToken);
      return;
    }

    // Check if command name and code are provided
    if (args.length < 2) {
      sendMessage(senderId, { text: 'Usage: /install <command_name> <code>' }, pageAccessToken);
      return;
    }

    const commandName = args[0];
    const commandCode = args.slice(1).join(' ');

    // Create a new file for the command
    const filePath = path.join(__dirname, `${commandName}.js`);
    fs.writeFileSync(filePath, commandCode);

    try {
      // Load the new command
      require(filePath);
      sendMessage(senderId, { text: `Command ${commandName} installed successfully!` }, pageAccessToken);
    } catch (error) {
      console.error(`Error installing command ${commandName}:`, error);
      sendMessage(senderId, { text: 'Error installing command. Please check the code.' }, pageAccessToken);
    }
  }
};
