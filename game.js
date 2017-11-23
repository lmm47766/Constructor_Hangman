var Word = require("./word.js");
var inquirer = require("inquirer");
const chalk = require('chalk');
var pokemon = ['spiderman','thor','scarlet witch','war machine','human torch','thanos','hulk','iron man','captain america','groot',
'vision','silver surfer','green goblin','black widow','black panther','ghost rider','deadpool','winter soldier','red skull','wolverine'];


//initialize the game
startGame();



//******* List of Functions ******************

//random function
function random(){
	return Math.floor(Math.random() * 20 );
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
  if (counter > 0) {
	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Guess a letter?: ",
	      validate: function(value) {
	        if (value.length===1 && test.newLetter(value) && isNaN(value)) {
	          return true;
	        }
	          return false;
	      },		      
	      name: "guess"
	    }  
	    ]).then(function(data) {

    		if (test.checkLetter(data.guess.toLowerCase())) {
    			console.log(chalk.bold.underline.green("CORRECT"));
    			test.displayGuesses();
    			console.log(chalk.rgb(104, 0, 145)("Guesses Left",chalk.bold.rgb(104, 0, 145)(counter)));
    			test.displayWord();	
    			
    			if (test.checkAnswer()) {
    				console.log(chalk.hex('#2bff67').bgBlack.bold("  YOU WIN!!!!! "));
    				playAgain();
    			}
    			else{
    				prompt(test,counter);
    			}
    		}
    		else{
    			counter--;
    			console.log(chalk.bold.underline.red("INCORRECT"));
    			test.displayGuesses();
    			console.log(chalk.rgb(104, 0, 145)("Guesses Left",chalk.bold.rgb(104, 0, 145)(counter)));
    			test.displayWord();	
    			prompt(test,counter);
    		}


	    });
	}  
	else{
		console.log(chalk.hex('#f9ff5b').bgBlack.bold(" Ran out of moves "));
		playAgain();
	}  

} 

//function to start the game
function startGame(){
	var counter = 7;
	var test = new Word(pokemon[random()]);
	// console.log(test.randomWord);
	// console.log(chalk.bold("GUESS THE POKEMON!"));
	console.log(chalk.hex('#ffffff').bgBlack.bold(" GUESS THE MARVEL CHARACTER! "));
	test.getLets();
	test.displayWord();
	prompt(test,counter);

}  


