module.exports = {
  name: 'eval',
  description: 'Evaluate JavaScript code.',
  admin: true,
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const code = args.join(' ');
      const result = eval(code);
      sendMessage(senderId, { text: `Result: ${result}` }, pageAccessToken);
    } catch (error) {
      sendMessage(senderId, { text: `Error: ${error.message}` }, pageAccessToken);
    }
  }
};