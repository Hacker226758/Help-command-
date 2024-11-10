const fs = require('fs');
const path = require('path');
const adminUids = ['100073129302064']; 

module.exports = {
  name: 'install',
  description: 'Install a new command',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    console.log('Sender ID:', senderId); // Debugging line
    console.log('Admin UIDs:', adminUids); // Debugging line

    if (!adminUids.includes(senderId)) { // Check if UID is in the array
      sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
      return;
    }

    const commandName = args[0];
    if (!commandName) {
      sendMessage(senderId, { text: 'Please provide a command name.' }, pageAccessToken);
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
      sendMessage(senderId, { text: 'There was an error installing the command. Please try again later.' }, pageAccessToken);
    }
  }
};
      
