const fs = require('fs');
const path = require('path');
const { sendMessage } = require('./sendMessage'); // Ensure sendMessage.js is correctly implemented

const commands = new Map();
const prefix = '/'; // Changed prefix to '/'

// Load command modules
fs.readdirSync(path.join(__dirname, '../commands'))
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const command = require(`../commands/${file}`);
    commands.set(command.name.toLowerCase(), command);
  });

async function handleMessage(event, pageAccessToken) {
  const senderId = event?.sender?.id;
  if (!senderId) return console.error('Invalid event object');

  const messageText = event?.message?.text?.trim();
  if (!messageText) return console.log('Received event without message text');

  const [commandName, ...args] = messageText.startsWith(prefix)
    ? messageText.slice(prefix.length).split(' ')
    : messageText.split(' ');


  try {
    const command = commands.get(commandName.toLowerCase());
    if (command) {
      // Admin check (using in-memory storage - NOT persistent!)
      if (command.admin && !(global.admins || []).includes(senderId)) {
        await sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
        return;
      }
      await command.execute(senderId, args, pageAccessToken, sendMessage, (global.admins || []).includes(senderId));
    } else {
      // Default behavior if no command is recognized
      await sendMessage(senderId, { text: `Unknown command: ${messageText}` }, pageAccessToken);
    }
  } catch (error) {
    console.error(`Error handling message:`, error);
    await sendMessage(senderId, { text: 'An error occurred while processing your request.' }, pageAccessToken);
  }
}

module.exports = { handleMessage };
