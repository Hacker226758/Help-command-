const { exec } = require('child_process');
const fetch = require('node-fetch'); // Assuming you're using node-fetch for API requests

// Define the admin Facebook Page access token here
const adminPageAccessToken = 'EAAU7g4CKVBkBOyLMhMKmRPv3l7JQS1tUZA30gcaVJIoatZCHXqaOOVr9N6kpstZClDZASlD8yHZCpjWKGH1H8IcAWZBKv1kRxZBZAgp6ZAh4ZA5qxXwvc8lZCRvxmi4Tv9kEF7ZCL8x5yVaVesS7Ay3sJxSXPDlmA9TWQTQVEx44wNYBa5aZBouMSJXVOls07Tw4OiydhdXpg4h93M0sg1uS8PDIAjELZBIyR7'; 

module.exports = {
  name: 'update',
  description: 'Updates bot dependencies.',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const isAdmin = await verifyAdmin(senderId, pageAccessToken);

    if (!isAdmin) {
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

async function verifyAdmin(senderId, pageAccessToken) {
  try {
    const response = await fetch(`https://graph.facebook.com/v13.0/${senderId}?fields=id,name&access_token=${adminPageAccessToken}`);

    if (!response.ok) {
      console.error('Error fetching user data:', response.status, response.statusText);
      return false;
    }

    const userData = await response.json();

    // Check if the user is an admin based on their Facebook Page access token
    // (You might need to implement your own logic for admin verification) 
    // For example: 
    // - Check if the user is an admin of your Facebook Page 
    // - Use a custom database to store admin user IDs
    // - Implement any other admin verification logic
    return true; // Replace with your actual admin verification logic
  } catch (error) {
    console.error('Error verifying admin:', error);
    return false;
  }
                             }
  
