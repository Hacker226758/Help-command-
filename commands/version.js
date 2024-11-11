const packageJson = require('./package.json');

module.exports = {
  name: 'version',
  description: 'Display bot version',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const version = packageJson.version;
      const versionMessage = `The Current Version of bot is ${version}`;

      sendMessage(senderId, { text: versionMessage }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(
        senderId,
        { text: 'Error fetching bot version.' },
        pageAccessToken
      );
    }
  },
};
