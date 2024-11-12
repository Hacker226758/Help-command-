const { exec } = require('child_process');

// Define the admin UID here (replace with your actual admin UID)
const adminUID = '100073129302064'; 

module.exports = {
  name: 'update',
  description: 'Updates bot dependencies.',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    if (senderId !== adminUID) { // Check if the sender is the admin
      sendMessage(senderId, { text: 'You do not have permission to use this command.' }, pageAccessToken);
      return;
    }

    sendMessage(senderId, { text: 'Updating dependencies...' }, pageAccessToken);
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${error}\n\`\`\`` }, pageAccessToken);
        return;
      }
      if (stderr) {
        sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${stderr}\n\`\`\`` }, pageAccessToken);
        return;
      }
      sendMessage(senderId, { text: `Dependencies updated successfully: \n\`\`\`\n${stdout}\n\`\`\`` }, pageAccessToken);
      //  IMPORTANT:  Add your bot restart mechanism HERE.  This is missing!
      //  Example (if you can restart via a simple shell command):
      //  exec('pm2 restart my-bot'); //Replace 'my-bot' with your bot's name
    });
  }
};
