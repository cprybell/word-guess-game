var words = ["blue", "yellow", "orange"];
var wordToGuess = "";
var wordToGuessString = [];
var lettersGuessed = [];
var guessesLeft = 10;
var wins = 0;
var gameWord = document.getElementById("wordGuess");

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
    wordtoGuess = randomWord(words);
    console.log(wordtoGuess);
    wordToGuessString = createEmptyString(wordtoGuess);
    console.log(wordToGuessString);
    gameWord.textContent = wordToGuessString;
}

initializeGame();

document.onkeyup = function(event) {
    var userGuess = event.key;
    
    if (!lettersGuessed.includes(userGuess)) {
        lettersGuessed.push(userGuess);
        console.log(userGuess);
        guessesLeft--;
        console.log(guessesLeft);
    } 
    

}