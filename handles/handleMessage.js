const fs = require('fs');
const path = require('path');
const { sendMessage } = require('./sendMessage'); // Make sure sendMessage.js exists

const commands = new Map();
const prefix = '-';
const adminUIDs = JSON.parse(fs.readFileSync('admins.json', 'utf8')).admins; // Load admin UIDs


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

    const isAdmin = adminUIDs.includes(senderId); // Check if the user is an admin

    try {
        const command = commands.get(commandName.toLowerCase());
        if (command) {
            //Check for admin-only commands
            if (command.admin && !isAdmin) {
                await sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
                return;
            }
            await command.execute(senderId, args, pageAccessToken, sendMessage, isAdmin); // Pass isAdmin
        } else {
            // Default command (gpt4) -  Consider whether this should be admin-restricted.
            await commands.get('gpt4').execute(senderId, [messageText], pageAccessToken, sendMessage, isAdmin); // Pass isAdmin
        }
    } catch (error) {
        console.error(`Error executing command:`, error);
        await sendMessage(senderId, { text: error.message || 'There was an error executing that command.' }, pageAccessToken);
    }
}

module.exports = { handleMessage };

                  
