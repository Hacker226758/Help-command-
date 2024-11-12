module.exports = {
  name: 'confess',
  description: 'Confess to a user',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const [message, userId] = args.join(" ").split("|").map(item => item.trim());

    // Input validation
    if (!message || !userId) {
      return sendMessage(senderId, { text: `Wrong format\nUse ${this.name} [Your message] | [Facebook user ID]` }, pageAccessToken);
    }

    if (isNaN(parseInt(userId))) {
      return sendMessage(senderId, { text: "Invalid User ID. Please enter a numeric User ID." }, pageAccessToken);
    }

    const confessions = [ //This part is added from the second structure
        "I've been wanting to tell you... I really like you.",
        "You're the first person I think about when I wake up.",
        "I'm so drawn to your kindness.",
        "I'm secretly a fan of your [insert something they like].",
        "I'm really grateful for your [insert something they've done].",
        "I think you're amazing and I'm so glad we're friends.",
    ];

    const randomConfession = message || confessions[Math.floor(Math.random() * confessions.length)]; // Use custom message or random confession

    try {
      const response = await sendMessage(userId, { text: `Someone has confessed to you:\n\nMessage: ${randomConfession}` }, pageAccessToken);
      if (response && response.status === 'success') {
        sendMessage(senderId, { text: "Confession sent successfully!" }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: `Error sending confession. Response: ${JSON.stringify(response)}` }, pageAccessToken);
      }
    } catch (error) {
      sendMessage(senderId, { text: `Error sending confession. Error: ${error.message}` }, pageAccessToken);
      console.error("Error sending message:", error);
    }
  }
};
