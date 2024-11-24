const axios = require('axios');

module.exports = {
name: 'rps',
  description: 'Play Rock Paper Scissors',
  author: 'Aljur Pogoy',
  execute(senderId, args, pageAccessToken, sendMessage) {
    const choices = ['rock', 'paper', 'scissors'];
    const userChoice = args[0].toLowerCase();
    if (!choices.includes(userChoice)) {
      sendMessage(senderId, { text: "Invalid choice. Please choose rock, paper, or scissors." }, pageAccessToken);
      return;
    }
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result;
    if (userChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = "You win!";
    } else {
      result = "You lose!";
    }
    sendMessage(senderId, { text: `You chose ${userChoice}, the computer chose ${computerChoice}.\n${result}` }, pageAccessToken);
  },