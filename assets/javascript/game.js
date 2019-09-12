// Defining variables below
// This variable is an array that holds the colors that could be guessed
var words = ["blue", "yellow", "orange", "aliceblue", "aqua", "azure", "beige", "black", "brown", "coral", "crimson", "cyan", "fuchsia", "gold", "gray", "indigo", "khaki", "lime", "linen", "maroon", "magenta", "navy", "olive", "orchid", "pink", "peru", "plum", "purple", "silver", "teal", "white"];
var wordToGuess = ""; // Holds the word to be guessed, initialzed to empty array
var wordToGuessString = []; // Variable to hold the word to guess as and array
var lettersGuessed = []; // Letters guessed array
var guessesLeft = 12;
var wins = 0;
var gameWord = document.getElementById("wordGuess");
var winHTML = document.getElementById("wins");
var guessesHTML = document.getElementById("guessesLeft");
var letterGuessedHTML = document.getElementById("lettersGuessed");
var winCounter = 0; // Variable used for the win condition, using lenght of the word and number of correct guesses
var colorField = document.getElementById("colorField");

// Function that chooses a random "word" (variable) from an array, returns the randomly choosen word
var randomWord = function(arrayIn) {
    var randomNumber = Math.floor(Math.random() * arrayIn.length);
    return arrayIn[randomNumber];
}

// Function that takes in a string and returns a string with the "_ " for each letter in the word, retunrs this string with letters missing
var createEmptyString = function(word) {
    var stringToReturn = "";
    for(i = 0; i < word.length; i++) {
        stringToReturn += "_ ";
    }
    return stringToReturn;
}

// Function used to reset/initialze the game to the state to begin the game
var resetGame = function() {
    winCounter = 0;
    guessesLeft = 12;
    lettersGuessed = [];
    wordToGuess = randomWord(words);
    console.log(wordToGuess);
    wordToGuessString = createEmptyString(wordToGuess);
    gameWord.textContent = wordToGuessString;
    winHTML.textContent = "You have won: " + wins;
    guessesHTML.textContent = "Guesses Left: " + guessesLeft;
    letterGuessedHTML.textContent = "Letters Guessed: " + lettersGuessed;
}

// Function checks if a string (word) contains the guessed letter. 
//Returns an array with the index of each instance of that letter found. Returns empty array if letter is not found.
var checkWord = function(word, guessedLetter) {
    var letterContained = [];
    for (i = 0; i < word.length; i++) {
        if (word.charAt(i) == guessedLetter) {
            letterContained.push(i);
        }
    }
    return letterContained;
}

// Function takes in a string, a letter that needs to be added, and an array with the indexes where that letter needs to be added.
// Also adds a space inbetween each letter for apperance on the webpage. Returns a string with the _ replaced with the letter.
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

// reset game is called to initalize the game
resetGame();

// Waits for the user to press a key
document.onkeyup = function(event) {
    var userGuess = event.key; // Catches user's guess and stores it
    var letterArray = []; // temporary array to store indices of where the letter is found in the word to guess
    
    // Checks to make sure the letter was not already guessed, if it was just ignores guess until next valid guess
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

    // Win condition if user guessed the word correctly, increments win counter, sets the backround of the div next to the game board to the color correctly guessed.
    // Finally resets the game.
    if (winCounter == wordToGuess.length) {
        wins++;
        colorField.style.backgroundColor = wordToGuess;
        resetGame();
    }
    
    // If the guesses left is 0 it sets the div next to the game board to white and resets the game.
    else if (guessesLeft == 0) {
        colorField.style.backgroundColor = "white";
        resetGame();
    }
}