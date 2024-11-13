const { exec } = require('child_process');

module.exports = {
  name: 'update',
  description: 'Updates bot dependencies.',
  admin: true,
  execute(senderId, args, pageAccessToken, sendMessage, adminUIDs) {
    // Check if the user is an admin
    if (!adminUIDs.includes(senderId)) {
      sendMessage(senderId, { text: 'You do not have permission to update dependencies.' }, pageAccessToken);
      return;
    }

    // Inform the user that the update process is starting
    sendMessage(senderId, { text: 'Updating dependencies...' }, pageAccessToken);

    // Execute npm install command
    exec('npm install', (error, stdout, stderr) => {
      // Handle errors during the update process
      if (error) {
        sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${error}\n\`\`\`` }, pageAccessToken);
        return;
      }
      if (stderr) {
        sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${stderr}\n\`\`\`` }, pageAccessToken);
        return;
      }

      // Inform the user that the update was successful
      sendMessage(senderId, { text: `Dependencies updated successfully: \n\`\`\`\n${stdout}\n\`\`\`` }, pageAccessToken);

      // Add your bot restart mechanism here (if needed)
      // Example: exec('pm2 restart my-bot'); // Replace 'my-bot' with your bot's name
    });
  }
};
         
