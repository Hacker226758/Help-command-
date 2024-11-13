module.exports = {
  name: 'adminlist',
  description: 'Lists all current admins.',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const adminList = global.admins || [];

    if (adminList.length === 0) {
      await sendMessage(senderId, { text: 'No admins are currently listed.' }, pageAccessToken);
      return;
    }

    try {
      const formattedList = await Promise.all(adminList.map(async (adminId) => {
        const name = await getUserName(adminId); // Placeholder function - replace with your logic
        return `- ${name || adminId}`; // Use name if available, otherwise use UID
      }));
      await sendMessage(senderId, { text: `Current Admins:\n${formattedList.join('\n')}` }, pageAccessToken);
    } catch (error) {
      console.error('Error getting admin list:', error);
      await sendMessage(senderId, { text: 'An error occurred while retrieving the admin list.' }, pageAccessToken);
    }
  }
};

// Placeholder function - REPLACE THIS with your actual name-fetching logic
async function getUserName(userId) {
  // Example: Fetch name from a database or external API
  // This is a placeholder; replace with your actual implementation.
  // For demonstration purposes, I'm returning a hardcoded name.
  if (userId === '1234567890') return 'John Doe';
  if (userId === '9876543210') return 'Jane Smith';
  return null; // Name not found
  }
