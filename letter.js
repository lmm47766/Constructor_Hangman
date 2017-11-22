const chalk = require('chalk');
//Letter constructor

function Letter(character,inWord){

	this.letter = character;
	this.inWord = inWord;
	this.letterDiplay = function() {
		if (this.letter === " ") {
			return " ";
		}
		else if (this.inWord) {
			return this.letter;
		}
		else{
			return "_";
		}
	}

}

module.exports = Letter;