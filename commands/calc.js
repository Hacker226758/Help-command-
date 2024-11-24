module.exports = {
    name: 'calc',
    description: 'Perform simple calculations.',
    admin: false,
    async execute(senderId, args, pageAccessToken, sendMessage) {
        try {
            const expression = args.join(' ');
            const result = eval(expression); //Use eval cautiously! Sanitize input if possible.
            sendMessage(senderId, { text: `Result: ${result}` }, pageAccessToken);
        } catch (error) {
            sendMessage(senderId, { text: 'Invalid calculation.' }, pageAccessToken);
        }
    }
};
