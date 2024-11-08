const axios = require("axios");

module.exports = {
  name: 'allowance',
  description: 'Receive your daily allowance',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const { senderID } = event;
      const userData = await usersData.get(senderID);
      const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
      const date = new Date();
      const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday

      if (userData.data.lastTimeGetReward === dateTime) {
        sendMessage(senderId, { text: 'You have already received your allowance today.' }, pageAccessToken);
        return;
      }

      sendMessage(senderId, { text: 'Claiming your daily allowance...' }, pageAccessToken);

      // Calculate reward based on day of the week
      const reward = calculateDailyReward(currentDay);

      // Update user data
      userData.data.lastTimeGetReward = dateTime;
      await usersData.set(senderID, {
        money: userData.money + reward.coin,
        exp: userData.exp + reward.exp,
      });

      // Send reward message
      sendMessage(senderId, { text: `You received ${reward.coin} coins and ${reward.exp} experience points!` }, pageAccessToken);

    } catch (error) {
      console.error('Error giving allowance:', error);
      sendMessage(senderId, { text: 'There was an error giving you your allowance. Please try again later.' }, pageAccessToken);
    }
  }
};

// Function to calculate daily reward
function calculateDailyReward(day) {
  // Example: Simple reward calculation
  let coinReward = 5000;
  let expReward = 5;

  // Adjust reward based on day of the week (you can customize this)
  if (day === 0 || day === 6) { // Sunday or Saturday
    coinReward *= 2;
    expReward *= 2;
  }

  return { coin: coinReward, exp: expReward };
}
