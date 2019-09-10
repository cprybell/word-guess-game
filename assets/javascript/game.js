var words = ["blue", "yellow", "orange"];
var wordToGuess = "";
var lettersGuessed = [""];

var randomWord = function(arrayIn) {
    var randomNumber = Math.floor(Math.random() * arrayIn.length);
    return arrayIn[randomNumber];
}

wordtoGuess = randomWord(words);
console.log(wordtoGuess);