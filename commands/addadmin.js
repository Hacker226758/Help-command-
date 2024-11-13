module.exports = {
  name: 'addadmin',
  description: 'Adds the current user to the admin list (requires verification code).',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const verificationCode = '-kazutoxbsk0'; // **Important:** Use environment variables for security in production!

    if (args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide the verification code.' }, pageAccessToken);
      return;
    }

    const providedCode = args[0];
    if (providedCode !== verificationCode) {
      await sendMessage(senderId, { text: 'Incorrect verification code.' }, pageAccessToken);
      return;
    }

    // Add the sender ID and name to the admin list in memory
    global.admins = global.admins || [];
    const existingAdmin = global.admins.find((admin) => admin.userId === senderId);
    if (existingAdmin) {
      await sendMessage(senderId, { text: 'You are already an admin.' }, pageAccessToken);
      return;
    }

    try {
      const userName = await getUserName(senderId); // Fetch user name
      global.admins.push({ userId: senderId, userName: userName || `User ${senderId}` }); //Store both userId and userName
      await sendMessage(senderId, { text: 'You have been added to the admin list.' }, pageAccessToken);
    } catch (error) {
      console.error('Error adding admin:', error);
      await sendMessage(senderId, { text: 'An error occurred while adding you to the admin list.' }, pageAccessToken);
    }
  }
};
    
