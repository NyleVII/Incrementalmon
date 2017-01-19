//AUTHOR: Stephen Antymis
//VERSION: 0.0.1 Jan 16, 2017
//REPOSITORY: https://github.com/NyleVII/Incrementalmon
//GAME AVAILABLE AT: https://nylevii.github.io/Incrementalmon/
//RESOURCES:
// Health Bars
// https://github.com/bmarwane/phaser.healthbar



//set width and height variables for game
var width = 800;  //480
var height = 600; //320
//create game object and initialize the canvas
var game = new Phaser.Game(width, height, Phaser.AUTO, null, {preload: preload, create: create, update: update});

var music;
var musicButton;

//initialize some variables
var gil = 0;
var income = 0;
var incomeText;
var gilText;
var year = 1;
var day = 1;
var season = "Spring";
var i = 1;
var player = new Monster("Nyle", 0, 1, "Spring", 2, 100, 100, 10, 10, 1, 1, 1, 1, "bit");

function preload() {
	//set background color of canvas
	game.stage.backgroundColor = '#eee';

	//load assets
	//load music
	game.load.audio('music','assets/Valse di Fantastica.mp3');
	//game.load.audio('music','assets/Valse di Fantastica(World).mp3');

	//load images
	game.load.image('player', 'assets/Blue_Yoshi_Egg.png');
	game.load.spritesheet('button', 'assets/Red_Yoshi_Egg.png', 1317, 1579);
	game.load.spritesheet('greenbutton', 'assets/Green_Yoshi_Egg.png', 1317, 1579);
	game.load.spritesheet('settings', 'assets/settings.png', 512, 512);
	game.load.spritesheet('playPause', 'assets/playpause.png', 288, 251) //image is 577x251
}
function create() {
	//Code to keep game running when not in focus (still might pause when game tab isn't visible)
	game.stage.disableVisibilityChange = true;

	//Create and play music
	music = game.add.audio('music');
	music.loop = true;
	music.play();
	musicButton = game.add.button(690, 2, 'playPause', musicToggle);
	musicButton.frame = 1; //Set music button to display 'pause' initially
	musicButton.scale.setTo(0.2,0.2);
	


	//Settings button
	settingsButton = game.add.button(748, 2, 'settings', toggleSettingsMenu);
	settingsButton.scale.setTo(0.1,0.1);

	//Create settingsMenu group
	settingsMenu = game.add.group();
	var settingsWindow = settingsMenu.create(game.world.centerX, game.world.centerY, 'player');
	settingsWindow.anchor.setTo(0.5,0.5);
	toggleSettingsMenu(); //Sets the visibility to default to off, was having problems with settingsWindow.visible = false;

	//Time group
	timeGroup = game.add.group();
	timeGroupAnchorX = 100;
	timeGroupAnchorY = 100;
	yearText = game.add.text(timeGroupAnchorX, timeGroupAnchorY,"Year: " + year, {/*style*/}, timeGroup); //text = game.add.text(0, 0, "Text", {/*style*/}, otherGroup); from http://www.html5gamedevs.com/topic/2606-can-text-be-added-to-a-group-or-only-sprites/
	dayText = game.add.text(timeGroupAnchorX, timeGroupAnchorY+30,"Day: " + day, {/*style*/}, timeGroup);
	seasonText = game.add.text(timeGroupAnchorX, timeGroupAnchorY+60,"Season: " + season, {/*style*/}, timeGroup);

	



	//Center red egg
	button = game.add.button(game.world.centerX, game.world.centerY, 'button', updateIncome);
	button.anchor.setTo(0.5,0.5);
	button.scale.setTo(0.1,0.1);
	button.onInputOver.add(buttonScaleBig,this);
	button.onInputOut.add(buttonScale,this);
	button.onInputDown.add(buttonScaleSmall,this);
	button.onInputUp.add(buttonScale,this);

	greenbutton = game.add.button(game.world.centerX+150, game.world.centerY, 'greenbutton', incrementTime);
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
	income = income + i + gil;
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

//Function that toggles on and off visibility of timeGroup
function toggleTimeGroup(){
	timeGroup.visible = !timeGroup.visible;
}

//Function toggles music on or off
function musicToggle(){
	if (music.isPlaying == true){
		music.pause();
		musicButton.frame = 0; //Set button to display 'play'
	}
	else{
		music.play();
		musicButton.frame = 1; //Set button to display 'pause'
	}
}


//Function to increment time
//25 days each season, 4 seasons in a year
//Spring -> Summer -> Fall -> Winter
function incrementTime(){
	if(day == 25){
		day = 1;

		//Switch to handle changing of seasons and years
		switch(season){
			case "Spring":
				season = "Summer";
				break;
			case "Summer":
				season = "Fall";
				break;
			case "Fall":
				season = "Winter";
				break;
			case "Winter":
				season = "Spring";
				year++;
				break;
			default:
				season = "Oh shit what have you done?!";
				break;
		}
	}
	else{
		day++;
	}

	//Update all time text variables
	yearText.text = "Year: " + year;
	dayText.text = "Day: " + day;
	seasonText.text = "Season: " + season;
}