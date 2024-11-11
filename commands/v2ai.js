

const axios = require('axios');

const aiServices = {
  hercai: {
    url: '(https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } })',
    params: {},
  },
};

module.exports = {
  name: 'ai',
  description: 'Ask me anything!',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const aiType = args[0];
    const aiAction = args[1];

    switch (aiType) {
      case 'hercai':
        await handleHercaiAI(senderId, aiAction, pageAccessToken, sendMessage);
        break;
      default:
        sendMessage(
          senderId,
          { text: 'Invalid AI type. Try /ai hercai.' },
          pageAccessToken
        );
    }
  },
};

async function handleHercaiAI(senderId, aiAction, pageAccessToken, sendMessage) {
  switch (aiAction) {
    case 'ask':
      askHercaiAI(senderId, pageAccessToken, sendMessage);
      break;
    case 'stop':
      stopHercaiAI(senderId, pageAccessToken, sendMessage);
      break;
    default:
      sendMessage(
        senderId,
        {
          text:
            'Invalid Hercai AI action. Try /ai hercai ask or /ai hercai stop.',
        },
        pageAccessToken
      );
  }
}

async function askHercaiAI(senderId, pageAccessToken, sendMessage) {
  const input = args.slice(2).join(' ');
  const service = aiServices.hercai;
  const params = { question: input };

  try {
    const response = await axios.get(service.url, { params });
    const data = response.data;

    if (data && (data.gpt4 || data.reply || data.response)) {
      const responseText = data.gpt4 || data.reply || data.response;
      sendMessage(senderId, { text: responseText }, pageAccessToken);
    } else {
      sendMessage(
        senderId,
        { text: 'No response from Hercai AI.' },
        pageAccessToken
      );
    }
  } catch (error) {
    console.error(error);
    sendMessage(
      senderId,
      { text: 'Error asking Hercai AI.' },
      pageAccessToken
    );
  }
}

async function stopHercaiAI(senderId, pageAccessToken, sendMessage) {
  sendMessage(senderId, { text: 'Hercai AI stopped.' }, pageAccessToken);
}
