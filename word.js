var Letter = require("./letter.js");

//Word constructor
function Word(pokemon){
	this.newWord=[];
	this.currentGuess=[];
	this.word = pokemon;
	this.randomWord = this.word.split("");
	this.getLets = function(boolean){

		for(var i = 0; i < this.word.length; i++){
			var a = new Letter(this.word[i],boolean)
			this.newWord.push( a.letterDiplay() );
		}
	}
	this.checkLetter = function(guess){
		if ( this.randomWord.indexOf(guess) > -1 ) {

			for (var i = 0; i < this.newWord.length; i++) {
				if ( this.word.charAt(i) === guess ) {
					this.newWord[i] = new Letter(this.word[i],true).letterDiplay();
				}

			}
			return true;
		}
		else{
			this.currentGuess.push(guess);
			return false;
		}

	}
	this.checkAnswer = function(){
		for (var i = 0; i < this.randomWord.length; i++) {
			if (this.randomWord[i] != this.newWord[i] ) {
				return false;				
			}
		}		
		return true;
	}
	this.displayWord = function(){
		console.log(this.newWord.join(" "))
	}
	this.displayGuesses = function(){
		console.log("Current guesses: ",this.currentGuess.join(" "))
	}		
	this.newLetter = function(letter){
		if (this.newWord.indexOf(letter) > -1 || this.currentGuess.indexOf(letter) > -1  ) {
			return false;
		}
		else {
			return true;
		}
	}

}


module.exports = Word;

