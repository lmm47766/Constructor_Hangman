var Word = require("./word.js");
var inquirer = require("inquirer");
var pokemon = ['charmander','squirtle','bulbasaur','pikachu','mewtwo','zapdos','moltres','articuno'];


//initialize the game
startGame();



//******* list of Functions ******************

//random function
function random(){
	return Math.floor(Math.random() * 8 );
}

//function to prompt user to play again
function playAgain(){
 inquirer
	.prompt(
		{
		  type: "confirm",	
	      name: "again",
	      message: "Would you like to play another match?"
		}).then(function(answer) {
	      if (answer.again === true) {
	        startGame();
	      }
	      else {
	        console.log("Come back again soon!");
	      }
	    });	
}

//function to promp user to guess letter
function prompt(test,counter){

	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Guess a letter?: ",
	      validate: function(value) {
	        if (value.length===1 && test.newLetter(value)) {
	          return true;
	        }
	          return false;
	      },		      
	      name: "guess"
	    }  
	    ]).then(function(data) {

	    	if (counter > 1) {
	    		if (test.checkLetter(data.guess)) {
	    			console.log("CORRECT");
	    			test.displayGuesses();
	    			console.log("Guesses Left: " + counter);
	    			test.displayWord();	
	    			
	    			if (test.checkAnswer()) {
	    				console.log("You win");
	    				playAgain();
	    			}
	    			else{
	    				prompt(test,counter);
	    			}
	    		}
	    		else{
	    			counter--;
	    			console.log("INCORRECT");
	    			test.displayGuesses();
	    			console.log("Guesses Left: " + counter);
	    			test.displayWord();	
	    			prompt(test,counter);
	    		}
	    	}
	    	else{
	    		console.log("Ran out of moves");
				playAgain();
	    	}

	    });

} 

//function to start the game
function startGame(){
	var counter = 9;
	var test = new Word(pokemon[random()]);
	// console.log(test.randomWord);
	console.log("Guess the pokemon!")
	test.getLets();
	test.displayWord();
	prompt(test,counter);

}  


