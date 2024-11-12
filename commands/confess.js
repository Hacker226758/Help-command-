const axios = require('axios');

module.exports = {
  name: 'confess',
  description: 'Confess to a user',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    // Check if the user provided a target user ID
    if (args.length === 0) {
        sendMessage(senderId, { text: "Please provide the Facebook User ID of the person you want to confess to." }, pageAccessToken);
        return;
    }

    const targetUserId = args[0]; 

    //Basic validation: Check if the ID looks like a number
    if (isNaN(parseInt(targetUserId))) {
        sendMessage(senderId, { text: "Invalid User ID. Please enter a numeric User ID." }, pageAccessToken);
        return;
    }


    const confessions = [
      "I've been wanting to tell you... I really like you.",
      "You're the first person I think about when I wake up.",
      "I'm so drawn to your kindness.", //Example of filling in a placeholder
      "I'm secretly a fan of your [insert something they like].",
      "I'm really grateful for your [insert something they've done].",
      "I think you're amazing and I'm so glad we're friends.",
    ];

    const randomConfession = confessions[Math.floor(Math.random() * confessions.length)];

    try {
        // Send the confession to the target user
        const response = await sendMessage(targetUserId, { text: `${randomConfession} - From ${senderId}` }, pageAccessToken);
        //Check for successful send (add error handling as needed based on your sendMessage function)
        if (response.status === 'success') {
            sendMessage(senderId, { text: `Confession sent to ${targetUserId}!` }, pageAccessToken);
        } else {
            sendMessage(senderId, { text: `Error sending confession. Please try again later.` }, pageAccessToken);
        }
    } catch (error) {
        console.error("Error sending message:", error);
        sendMessage(senderId, { text: `Error sending confession. Please try again later.` }, pageAccessToken);
    }
  }
};
  
