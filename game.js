//AUTHOR: Stephen Antymis
//VERSION: 0.0.1 Jan 16, 2017
//HOSTED LIVE AT: https://github.com/NyleVII/Incrementalmon
//GAME AVAILABLE AT: https://nylevii.github.io/Incrementalmon/
//RESOURCES:
//Health Bars
// https://github.com/bmarwane/phaser.healthbar



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
	//load music
	game.load.audio('music','assets/Valse di Fantastica.mp3');
	//load images
	game.load.image('player', 'assets/Blue_Yoshi_Egg.png');
	game.load.spritesheet('button', 'assets/Red_Yoshi_Egg.png', 1317, 1579);
	game.load.spritesheet('greenbutton', 'assets/Green_Yoshi_Egg.png', 1317, 1579);
	game.load.spritesheet('settings', 'assets/settings.png', 512, 512);
}
function create() {
	//Code to keep game running when not in focus (still might pause when game tab isn't visible)
	game.stage.disableVisibilityChange = true;

	//Create and play music
	music = game.add.audio('music');
	music.play();

	//Settings button
	settingsButton = game.add.button(748, 2, 'settings', toggleSettingsMenu);
	settingsButton.scale.setTo(0.1,0.1);

	//Create settingsMenu group
	settingsMenu = game.add.group();
	var settingsWindow = settingsMenu.create(game.world.centerX, game.world.centerY, 'player');
	settingsWindow.anchor.setTo(0.5,0.5);



	//Center red egg
	button = game.add.button(game.world.centerX, game.world.centerY, 'button', updateIncome);
	button.anchor.setTo(0.5,0.5);
	button.scale.setTo(0.1,0.1);
	button.onInputOver.add(buttonScaleBig,this);
	button.onInputOut.add(buttonScale,this);
	button.onInputDown.add(buttonScaleSmall,this);
	button.onInputUp.add(buttonScale,this);

	greenbutton = game.add.button(game.world.centerX+150, game.world.centerY, 'greenbutton', updateIncome);
	greenbutton.anchor.setTo(0.5,0.5);
	greenbutton.scale.setTo(0.1,0.1);

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
	incomeText.text = "Income: " + income;
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

//Function that toggles on and off visibility of settings menu
function toggleSettingsMenu(){
	settingsMenu.visible = !settingsMenu.visible;
}







