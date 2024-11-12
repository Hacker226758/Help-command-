const axios = require('axios');

module.exports = {
  name: 'confess',
  description: 'Confess to a user',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const targetUserId = args[0]; // Assuming the first argument is the target user ID

    if (!targetUserId) {
      sendMessage(senderId, { text: "Please enter the Facebook user ID of the person you want to confess to." }, pageAccessToken);
      return;
    }

    const confessions = [
      "I've been wanting to tell you... I really like you.",
      "You're the first person I think about when I wake up.",
      "I'm so drawn to your [insert a specific quality].",
      "I'm secretly a fan of your [insert something they like].",
      "I'm really grateful for your [insert something they've done].",
      "I think you're amazing and I'm so glad we're friends.",
    ];

    const randomConfession = confessions[Math.floor(Math.random() * confessions.length)];

    // Send the confession to the target user
    sendMessage(targetUserId, { text: `${randomConfession} - From ${senderId}` }, pageAccessToken);

    // Optionally, send a confirmation message to the sender
    sendMessage(senderId, { text: `Confession sent to ${targetUserId}!` }, pageAccessToken);
  }
};
