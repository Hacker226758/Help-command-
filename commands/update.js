const { exec } = require('child_process');

// Replace this with your actual admin access token
const adminAccessToken = 'EAAU7g4CKVBkBOyLMhMKmRPv3l7JQS1tUZA30gcaVJIoatZCHXqaOOVr9N6kpstZClDZASlD8yHZCpjWKGH1H8IcAWZBKv1kRxZBZAgp6ZAh4ZA5qxXwvc8lZCRvxmi4Tv9kEF7ZCL8x5yVaVesS7Ay3sJxSXPDlmA9TWQTQVEx44wNYBa5aZBouMSJXVOls07Tw4OiydhdXpg4h93M0sg1uS8PDIAjELZBIyR7'; // Store your actual access token here

module.exports = {
  name: 'update',
  description: 'Updates bot dependencies.',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    if (pageAccessToken !== adminAccessToken) {
      sendMessage(senderId, { text: 'You do not have permission to update dependencies.' }, pageAccessToken);
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
