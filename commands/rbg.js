const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  name: 'rbg',
  description: 'Remove background from an image',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");
    if (!photoUrl) {
      sendMessage(senderId, { text: "📸 𝖯𝗅𝖾𝖺𝗌𝖾 𝗋𝖾𝗉𝗅𝗎 𝗍𝗈 𝖺 𝗉𝗁𝗈𝗍𝗈 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝗌𝗌 𝖺𝗇𝖽 𝗋𝖾𝗆𝗈𝗏𝖾 𝖻𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽𝗌." }, pageAccessToken);
      return;
    }

    sendMessage(senderId, { text: "🕟 | 𝖱𝖾𝗆𝗈𝗏𝗂𝗇𝗀 𝖡𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖽, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/removebg?url=${encodeURIComponent(photoUrl)}`);
      if (response.data.hasOwnProperty("error")) {
        return sendMessage(senderId, { text: response.data.error }, pageAccessToken);
      }

      const processedImageURL = response.data.image_data;
      const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;
      let pathie = __dirname + `/cache/removed_bg.jpg`;
      fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

      sendMessage(senderId, {
        body: "✨ 𝖧𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗂𝗆𝖺𝗀𝖾 𝗐𝗂𝗍𝗁𝗈𝗎𝗍 𝖻𝖺𝖼𝗄𝗀𝗋𝗈𝗎𝗇𝖺𝖺𝖴",
        attachment: fs.createReadStream(pathie)
      }, pageAccessToken, () => fs.unlinkSync(pathie));

    } catch (error) {
      sendMessage(senderId, { text: `🔴 𝖤𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖢𝖾𝗌𝗌𝖨𝗂𝗆𝖺𝖺𝖴: ${error}` }, pageAccessToken);
    }
  }
};
                
