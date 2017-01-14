//set width and height variables for game
var width = 800;  //480
var height = 600; //320
//create game object and initialize the canvas
var game = new Phaser.Game(width, height, Phaser.AUTO, null, {preload: preload, create: create, update: update});

//initialize some variables
var gil = 0;
var income = 0;
var incomeText;
var gilText;
var i = 1;

function preload() {
	//set background color of canvas
	game.stage.backgroundColor = '#eee';

	//load assets
	game.load.image('player', 'assets/Blue_Yoshi_Egg.png');
	game.load.spritesheet('button', 'assets/Red_Yoshi_Egg.png', 1317, 1579);
}
function create() {
	button = game.add.button(game.world.centerX, game.world.centerY, 'button', updateIncome);
	button.anchor.setTo(0.5,0.5);
	button.scale.setTo(0.1,0.1);
	button.onInputOver.add(buttonScaleBig,this);
	button.onInputOut.add(buttonScale,this);
	button.onInputDown.add(buttonScaleSmall,this);
	button.onInputUp.add(buttonScale,this);

	//place score text on the screen
	gilText = game.add.text(5, 3, "Gil: " + gil);
	incomeText = game.add.text(5,30,"Income: " + income);

	game.time.events.loop(Phaser.Timer.QUARTER, updateGil, this);
}
function update() {

}

//updateIncome function
function updateIncome(){
	income = income + i;
	incomeText.text = "Income: " + income
}

//updateGil function
function updateGil(){
	gil = gil + (income/4);
	gilText.text = "Gil: " + gil;
}

function buttonScaleSmall(){
	button.scale.setTo(0.09,0.09);
}
function buttonScaleBig(){
	button.scale.setTo(0.11,0.11);
}
function buttonScale(){
	button.scale.setTo(0.1,0.1);
}