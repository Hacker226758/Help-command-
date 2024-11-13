module.exports = {
  name: 'adminlist',
  description: 'Lists all current admins.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const adminList = global.admins || []; // Get admins from memory

    if (adminList.length === 0) {
      await sendMessage(senderId, { text: 'No admins are currently listed.' }, pageAccessToken);
    } else {
      const formattedList = adminList.map(adminId => `- ${adminId}`).join('\n');
      await sendMessage(senderId, { text: `Current Admins:\n${formattedList}` }, pageAccessToken);
    }
  }
};
