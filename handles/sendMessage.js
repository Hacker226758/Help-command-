const axios = require('axios');
const { basename } = require('path');

const axiosPost = (url, data, params) => axios.post(url, data, { params }).then(res => res.data);

const sendMessage = async (senderId, { text, attachment }, pageAccessToken) => {
  if (!text && !attachment) {
    console.error("Error: Missing both text and attachment in message payload");
    return;
  }

  const url = `https://graph.facebook.com/v21.0/me/messages`;
  const params = { access_token: pageAccessToken };
  const recipient = { recipient: { id: senderId || null } };

  try {
    await axiosPost(url, { ...recipient, sender_action: "typing_on" }, params);

    let messagePayload = {};

    if (text) {
      messagePayload = { text };
    }

    if (attachment) {
      if (attachment.type === 'template') {
        messagePayload = {
          attachment: {
            type: 'template',
            payload: attachment.payload
          }
        };
      } else {
        messagePayload = {
          attachment: {
            type: attachment.type,
            payload: { url: attachment.payload.url, is_reusable: true }
          }
        };
      }
    }

    // pampaganda lol
    console.log("____________________________________________________");
    console.log("____________________________________________________");
    console.log(`Recipient ID: ${senderId}`);
    console.log('Sending Message Payload:', JSON.stringify(messagePayload, null, 2));
    const response = await axiosPost(url, { ...recipient, message: messagePayload }, params);
    console.log(`Message ID: ${response.message_id}`);

    await axiosPost(url, { ...recipient, sender_action: "typing_off" }, params);
  } catch (e) {

    const errorMessage = e.response?.data?.error?.message;
    if (errorMessage === "(#100) No matching user found") {
      // Ignore this specific error
      return;
    } else if (errorMessage) {
      console.error(`Error in ${basename(__filename)}: ${errorMessage}`);
    } else {
      console.error(`Error in ${basename(__filename)}: ${e.message}`);
    }
  }
};

// Function to send a quick reply message
const sendQuickReplyMessage = async (senderId, text, quickReplies, pageAccessToken) => {
  const url = `https://graph.facebook.com/v21.0/me/messages`;
  const params = { access_token: pageAccessToken };
  const recipient = { recipient: { id: senderId || null } };

  try {
    await axiosPost(url, { ...recipient, sender_action: "typing_on" }, params);

    const quickReplyPayload = {
      text: text || 'Select an option:',
      quick_replies: quickReplies.map(reply => ({
        content_type: 'text',
        title: reply.title,
        payload: reply.payload
      }))
    };

    // pampaganda lol
    console.log("____________________________________________________");
    console.log("____________________________________________________");
    console.log(`Recipient ID: ${senderId}`);
    console.log('Sending Message Payload:', JSON.stringify(quickReplyPayload, null, 2));
    const response = await axiosPost(url, { ...recipient, message: quickReplyPayload }, params);
    console.log(`Message ID: ${response.message_id}`);

    await axiosPost(url, { ...recipient, sender_action: "typing_off" }, params);
  } catch (e) {
    const errorMessage = e.response?.data?.error?.message;
    if (errorMessage === "(#100) No matching user found") {
      // Ignore this specific error
      return;
    } else if (errorMessage) {
      console.error(`Error in ${basename(__filename)}: ${errorMessage}`);
    } else {
      console.error(`Error in ${basename(__filename)}: ${e.message}`);
    }
  }
};


global.sendMessage = sendMessage;
global.sendQuickReplyMessage = sendQuickReplyMessage;
