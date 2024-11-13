module.exports = {
  name: 'addadmin',
  description: 'Adds the current user to the admin list (requires verification code).',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const verificationCode = '-kazutoxbsk0'; // Verification code - Keep this secure!  Use environment variables in production.

    if (args.length === 0) {
      await sendMessage(senderId, { text: 'Please provide the verification code.' }, pageAccessToken);
      return;
    }

    const providedCode = args[0];
    if (providedCode !== verificationCode) {
      await sendMessage(senderId, { text: 'Incorrect verification code.' }, pageAccessToken);
      return;
    }

    // Add the sender ID to the admin list in memory.  This is lost on restart!
    global.admins = global.admins || []; // Initialize if not already initialized
    if (global.admins.includes(senderId)) {
        await sendMessage(senderId, { text: 'You are already an admin.' }, pageAccessToken);
        return;
    }
    global.admins.push(senderId);
    await sendMessage(senderId, { text: 'You have been added to the admin list.' }, pageAccessToken);
  }
};
        
