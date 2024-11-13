const { exec } = require('child_process');

module.exports = {
  name: 'update',
  description: 'Updates bot dependencies.',
  admin: true, // This command requires admin privileges
  async execute(senderId, args, pageAccessToken, sendMessage, isAdmin) {
    if (!isAdmin) {
      await sendMessage(senderId, { text: 'You do not have permission to update dependencies.' }, pageAccessToken);
      return;
    }

    await sendMessage(senderId, { text: 'Updating dependencies...' }, pageAccessToken);

    try {
      const { stdout, stderr, error } = await execPromise('npm install'); // Use execPromise

      if (error) {
        await sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${error.message}\n\`\`\`` }, pageAccessToken);
      } else if (stderr) {
        await sendMessage(senderId, { text: `Error updating: \n\`\`\`\n${stderr}\n\`\`\`` }, pageAccessToken);
      } else {
        await sendMessage(senderId, { text: `Dependencies updated successfully: \n\`\`\`\n${stdout}\n\`\`\`` }, pageAccessToken);
        // Add your bot restart mechanism here (if needed)
        // Example: await execPromise('pm2 restart my-bot'); // Replace 'my-bot' with your bot's name
      }
    } catch (error) {
      console.error('Error during npm install:', error);
      await sendMessage(senderId, { text: 'An unexpected error occurred during the update.' }, pageAccessToken);
    }
  }
};


// Helper function to execute shell commands and handle promises
async function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr, error });
      }
    });
  });
}
