const axios = require('axios');

module.exports = {
name: 'guess',
  description: 'Play a number guessing game',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let guessesLeft = 5;
    sendMessage(senderId, { text: 'I'm thinking of a number between 1 and 100. You have 5 guesses.' }, pageAccessToken);
    const guessHandler = async (guess) => {
      const guessNumber = parseInt(guess);
      if (isNaN(guessNumber)) {
        sendMessage(senderId, { text: 'Please enter a valid number.' }, pageAccessToken);
        return;
      }
      guessesLeft--;
      if (guessNumber === secretNumber) {
        sendMessage(senderId, { text: `You guessed it! The number was ${secretNumber}.` }, pageAccessToken);
        return;
      } else if (guessNumber < secretNumber) {
        sendMessage(senderId, { text: 'Too low! Guesses left: ' + guessesLeft }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Too high! Guesses left: ' + guessesLeft }, pageAccessToken);
      }
      if (guessesLeft === 0) {
        sendMessage(senderId, { text: `You ran out of guesses! The number was ${secretNumber}.` }, pageAccessToken);
      }
    };