
const games = {
  hangman: {
    word: '',
    guesses: 6,
    guessedLetters: [],
    display: ''
  },
  20questions: {
    questions: [],
    answers: [],
    currentQuestion: 0
  }
};

module.exports = {
  name: 'game',
  description: 'Play games with me!',
  author: 'Aljur Pogoy',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const gameType = args[0];
    const gameAction = args[1];

    switch (gameType) {
      case 'hangman':
        await handleHangman(senderId, gameAction, pageAccessToken, sendMessage);
        break;
      case '20questions':
        await handle20Questions(senderId, gameAction, pageAccessToken, sendMessage);
        break;
      default:
        sendMessage(senderId, { text: 'Invalid game type. Try /game hangman or /game 20questions.' }, pageAccessToken);
    }
  }
};

async function handleHangman(senderId, gameAction, pageAccessToken, sendMessage) {
  switch (gameAction) {
    case 'start':
      startHangmanGame(senderId, pageAccessToken, sendMessage);
      break;
    case 'guess':
      guessLetter(senderId, pageAccessToken, sendMessage);
      break;
    case 'stop':
      stopHangmanGame(senderId, pageAccessToken, sendMessage);
      break;
    default:
      sendMessage(senderId, { text: 'Invalid hangman action. Try /game hangman start, /game hangman guess, or /game hangman stop.' }, pageAccessToken);
  }
}

async function startHangmanGame(senderId, pageAccessToken, sendMessage) {
  const word = generateRandomWord();
  games.hangman.word = word;
  games.hangman.guesses = 6;
  games.hangman.guessedLetters = [];
  games.hangman.display = '_'.repeat(word.length);

  sendMessage(senderId, { text: `Welcome to Hangman! Guess the word: ${games.hangman.display}` }, pageAccessToken);
}

async function guessLetter(senderId, pageAccessToken, sendMessage) {
  const letter = args[2];
  const word = games.hangman.word;

  if (word.includes(letter)) {
    games.hangman.guessedLetters.push(letter);
    games.hangman.display = word.split('').map((l) => games.hangman.guessedLetters.includes(l) ? l : '_').join('');
  } else {
    games.hangman.guesses--;
  }

  sendMessage(senderId, { text: `Guesses left: ${games.hangman.guesses}. Word: ${games.hangman.display}` }, pageAccessToken);
}

async function stopHangmanGame(senderId, pageAccessToken, sendMessage) {
  sendMessage(senderId, { text: 'Game stopped.' }, pageAccessToken);
  resetHangmanGame();
}

async function handle20Questions(senderId, gameAction, pageAccessToken, sendMessage) {
  switch (gameAction) {
    case 'start':
      start20QuestionsGame(senderId, pageAccessToken, sendMessage);
      break;
    case 'answer':
      answerQuestion(senderId, pageAccessToken, sendMessage);
      break;
    case 'stop':
      stop20QuestionsGame(senderId, pageAccessToken, sendMessage);
      break;
    default:
      sendMessage(senderId, { text: 'Invalid 20 questions action. Try /game 20questions start, /game 20questions answer, or /game 20questions stop.' }, pageAccessToken);
  }
}
