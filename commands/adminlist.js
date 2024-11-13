module.exports = {
  name: 'adminlist',
  description: 'Lists all current admins.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const adminList = global.admins || [];

    if (adminList.length === 0) {
      await sendMessage(senderId, { text: 'No admins are currently listed.' }, pageAccessToken);
      return;
    }

    const formattedList = adminList.map((admin) => `- ID: ${admin.userId}, Name: ${admin.userName}`).join('\n');
    await sendMessage(senderId, { text: `Current Admins:\n${formattedList}` }, pageAccessToken);
  }
};

// Placeholder function - REPLACE THIS with your actual name-fetching logic
async function getUserName(userId) {
  // Example: Fetch name from a database or external API
  // This is a placeholder; replace with your actual implementation.
  // For demonstration purposes, I'm returning a hardcoded name.
  if (userId === '100073129302064) return 'Aljur Pogoy';
  return null; // Name not found
}
