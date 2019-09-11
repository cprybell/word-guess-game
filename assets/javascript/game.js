var words = ["blue", "yellow", "orange"];
var wordToGuess = "";
var wordToGuessString = [];
var lettersGuessed = [];
var guessesLeft = 10;
var wins = 0;
var gameWord = document.getElementById("wordGuess");
var winHTML = document.getElementById("wins");
var guessesHTML = document.getElementById("guessesLeft");
var letterGuessedHTML = document.getElementById("lettersGuessed");
var winCounter = 0;
var compareLength = 0;

var randomWord = function(arrayIn) {
    var randomNumber = Math.floor(Math.random() * arrayIn.length);
    return arrayIn[randomNumber];
}

var createEmptyString = function(word) {
    var stringToReturn = "";
    for(i = 0; i < word.length; i++) {
        stringToReturn += "_ ";
    }
    return stringToReturn;
}

var initializeGame = function() {
    wordToGuess = randomWord(words);
    //compareLength = wordToGuess.
    console.log(wordToGuess);
    wordToGuessString = createEmptyString(wordToGuess);
    gameWord.textContent = wordToGuessString;
    winHTML.textContent = "You have won: " + wins;
    guessesHTML.textContent = "Guesses Left: " + guessesLeft;
    letterGuessedHTML.textContent = "Letters Guessed: " + lettersGuessed;
}

var resetGame = function() {
    winCounter = 0;
    guessesLeft = 10;
    lettersGuessed = [];
    wordToGuess = randomWord(words);
    console.log(wordToGuess);
    wordToGuessString = createEmptyString(wordToGuess);
    gameWord.textContent = wordToGuessString;
    winHTML.textContent = "You have won: " + wins;
    guessesHTML.textContent = "Guesses Left: " + guessesLeft;
    letterGuessedHTML.textContent = "Letters Guessed: " + lettersGuessed;
}

var checkWord = function(word, guessedLetter) {
    var letterContained = [];
    for (i = 0; i < word.length; i++) {
        if (word.charAt(i) == guessedLetter) {
            letterContained.push(i);
        }
    }
    return letterContained;
}

var fillWord = function(word, letterArray, letter) {
    var stringToReturn = "";
    var arrayCounter = 0;
    var currentLetter = word.charAt(0);
    if (letterArray.length == 0) {
        return word;
    }
    else {
        for (i = 0; i < word.length / 2; i++) {
            currentLetter = word.charAt(i * 2);
            if (letterArray[arrayCounter] == i) {
                stringToReturn = stringToReturn + letter + " ";
                arrayCounter++;
            }
            else {
                stringToReturn = stringToReturn + currentLetter + " ";
            }
        }
        return stringToReturn;
    }
}

console.log(wordToGuess.length);

initializeGame();

document.onkeyup = function(event) {
    var userGuess = event.key;
    var letterArray = [];
    
    if (!lettersGuessed.includes(userGuess)) {
        lettersGuessed.push(userGuess);
        guessesLeft--;
        guessesHTML.textContent = "Guesses Left: " + guessesLeft;
        letterGuessedHTML.textContent = "Letters Guessed: " + lettersGuessed;
        letterArray = checkWord(wordToGuess, userGuess);
        wordToGuessString = fillWord(wordToGuessString, letterArray, userGuess);
        gameWord.textContent = wordToGuessString;
        winCounter += letterArray.length;
    }

    if (winCounter == wordToGuess.length) {
        wins++;
        resetGame();
    }
    
    else if (guessesLeft == 0) {
        resetGame();
    }

    console.log(wordToGuess);
    console.log(winCounter);
    console.log(wordToGuess.length);
}