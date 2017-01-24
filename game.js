//AUTHOR: Stephen Antymis
//VERSION: 0.0.1 Jan 16, 2017
//REPOSITORY: https://github.com/NyleVII/Incrementalmon
//GAME AVAILABLE AT: https://nylevii.github.io/Incrementalmon/
//RESOURCES:
// Health Bars
// https://github.com/bmarwane/phaser.healthbar



//set width and height variables for game
var WINDOW_WIDTH = 1280;  //480
var WINDOW_HEIGHT = 720; //320
//create game object and initialize the canvas
var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, null, {preload: preload, create: create, update: update});

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
var player = new Monster("Nyle", 0, 1, "Spring", 2, 100, 100, 10, 10, 1, 1, 1, 1, "Bit");

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
	game.load.image('dojoBackground', 'assets/dojoBackground.png');
	game.load.image('blueButton', 'assets/BlueButton200x81.png');
}
function create() {
	//Set background image
	background = game.add.tileSprite(0,0,1280,720, 'dojoBackground');

	//Code to keep game running when not in focus (still might pause when game tab isn't visible)
	game.stage.disableVisibilityChange = true;

	//Button Text style
	var textStyle = { font: "25px Arial", wordWrap: false, wordWrapWidth: 190, align: "center", strokeThickness: 6, fill: 'white'};

	//Settings button
	settingsButton = game.add.button(WINDOW_WIDTH, 0, 'settings', toggleSettingsMenu);
	settingsButton.anchor.setTo(1,0); //Anchor set to top right corner
	settingsButton.scale.setTo(0.1,0.1);

	//Create and play music
	music = game.add.audio('music');
	music.loop = true;
	music.volume = 0.3;
	music.play();
	musicButton = game.add.button(settingsButton.left - settingsButton.width - 5, 0, 'playPause', musicToggle);
	musicButton.frame = 1; //Set music button to display 'pause' initially
	musicButton.scale.setTo(0.2,0.2);
	

	//Create settingsMenu group
	settingsMenu = game.add.group();
	var settingsWindow = settingsMenu.create(game.world.centerX, game.world.centerY, 'player');
	settingsWindow.anchor.setTo(0.5,0.5);
	toggleSettingsMenu(); //Sets the visibility to default to off, was having problems with settingsWindow.visible = false;

	//Time group
	timeGroup = game.add.group();
	timeGroupAnchorX = 300;
	timeGroupAnchorY = 0;
	//text = game.add.text(x, y, "Text", {/*style*/}, otherGroup); from http://www.html5gamedevs.com/topic/2606-can-text-be-added-to-a-group-or-only-sprites/
	yearText = game.add.text(timeGroupAnchorX, timeGroupAnchorY,"Year: " + year, textStyle, timeGroup); 
	dayText = game.add.text(timeGroupAnchorX, timeGroupAnchorY+30,"Day: " + day, textStyle, timeGroup);
	seasonText = game.add.text(timeGroupAnchorX, timeGroupAnchorY+60,"Season: " + season, textStyle, timeGroup);

	//Monster Stats group
	monsterStatsGroup = game.add.group();
	monsterStatsGroupAnchorX = 5;
	monsterStatsGroupAnchorY = 0;
	monsterStatsTextOffset = 30;
	monsterStatsNameText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*0, 	"Name: " + player.name, textStyle, monsterStatsGroup);
	monsterStatsAgeText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*1, 		"Age: " + player.age, textStyle, monsterStatsGroup);
	monsterStatsBirthdayText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*2, "Birthday: " + player.birthseason + " " + player.birthday, textStyle, monsterStatsGroup);
	monsterStatsWeightText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*3, 	"Weight: " + player.weight, textStyle, monsterStatsGroup);
	monsterStatsHappinessText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*4,"Happiness: " + player.happiness, textStyle, monsterStatsGroup);
	monsterStatsHungerText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*5, 	"Hunger: " + player.hunger, textStyle, monsterStatsGroup);
	monsterStatsHPText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*6, 		"HP: " + player.currenthp + "/" + player.maxhp, textStyle, monsterStatsGroup);
	monsterStatsStrengthText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*7, "Str: " + player.strength, textStyle, monsterStatsGroup);
	monsterStatsIntelligenceText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*8, "Int: " + player.intelligence, textStyle, monsterStatsGroup);
	monsterStatsSpeedText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*9, 	"Speed: " + player.speed, textStyle, monsterStatsGroup);
	monsterStatsDefenceText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*10, "Defence: " + player.defence, textStyle, monsterStatsGroup);
	monsterStatsEvoStageText = game.add.text(monsterStatsGroupAnchorX, monsterStatsGroupAnchorY + monsterStatsTextOffset*11,"Stage: " + player.evoStage, textStyle, monsterStatsGroup);

	//Game Menu group
	gameMenuGroup = game.add.group();
	//Train button in game menu group
	trainButton = game.add.button(5,WINDOW_HEIGHT - 86, 'blueButton', updateIncome);
	gameMenuGroup.add(trainButton);
	trainButtonText = game.add.text(Math.floor(trainButton.x + trainButton.width/2) , Math.floor(trainButton.y + trainButton.height/2), "Train", textStyle, gameMenuGroup);
	trainButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(trainButtonText);

	//Feed button in game menu group
	feedButton = game.add.button(210, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(feedButton);
	feedButtonText = game.add.text(Math.floor(feedButton.x + feedButton.width/2) , Math.floor(feedButton.y + feedButton.height/2), "Feed", textStyle, gameMenuGroup);
	feedButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(feedButtonText);

	//Tournaments button in game menu group
	tournamentButton = game.add.button(415, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(tournamentButton);
	tournamentButtonText = game.add.text(Math.floor(tournamentButton.x + tournamentButton.width/2), Math.floor(tournamentButton.y + tournamentButton.height/2), "Tournament", textStyle, gameMenuGroup);
	tournamentButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(tournamentButtonText);

	//Rest button in game menu group
	restButton = game.add.button(620, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(restButton);
	restButtonText = game.add.text(Math.floor(restButton.x + restButton.width/2), Math.floor(restButton.y + restButton.height/2), "Rest", textStyle, gameMenuGroup);
	restButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(restButtonText);

	//Battle in game menu group
	battleButton = game.add.button(825, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(battleButton);
	battleButtonText = game.add.text(Math.floor(battleButton.x + battleButton.width/2), Math.floor(battleButton.y + battleButton.height/2), "Battle", textStyle, gameMenuGroup);
	battleButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(battleButtonText);

	//Items in game menu group
	itemsButton = game.add.button(1030, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(itemsButton);
	itemsButtonText = game.add.text(Math.floor(itemsButton.x + itemsButton.width/2), Math.floor(itemsButton.y + itemsButton.height/2), "Items", textStyle, gameMenuGroup);
	itemsButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(itemsButtonText);

	//Town in game menu group
	townButton = game.add.button(1235, WINDOW_HEIGHT - 86, 'blueButton', incrementTime);
	gameMenuGroup.add(townButton);
	townButtonText = game.add.text(Math.floor(townButton.x + townButton.width/2), Math.floor(townButton.y + townButton.height/2), "Town", textStyle, gameMenuGroup);
	townButtonText.anchor.setTo(0.5,0.5);
	gameMenuGroup.add(townButtonText);

	//Center red egg
	button = game.add.button(game.world.centerX, game.world.centerY, 'button', updateIncome);
	button.anchor.setTo(0.5,0.5);
	button.scale.setTo(0.1,0.1);
	button.onInputOver.add(buttonScaleBig,this);
	button.onInputOut.add(buttonScale,this);
	button.onInputDown.add(buttonScaleSmall,this);
	button.onInputUp.add(buttonScale,this);

	greenbutton = game.add.button(game.world.centerX+150, game.world.centerY, 'greenbutton', toggleGameMenuGroup);
	greenbutton.anchor.setTo(0.5,0.5);
	greenbutton.scale.setTo(0.1,0.1);

	//place score text on the screen
	gilText = game.add.text(game.world.centerX - 60, game.world.centerY + 80, "Gil: " + gil, textStyle);
	incomeText = game.add.text(game.world.centerX - 60,game.world.centerY + 110,"Income: " + income, textStyle);

	game.time.events.loop(Phaser.Timer.QUARTER, updateGil, this);


}
function update() {
//Update train button text to keep text centered


}

//updateIncome function
function updateIncome(){
	income = income + 1;
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

//Function that toggles on and off visibility of monsterStatsGroup
function toggleMonsterStatsGroup(){
	monsterStatsGroup.visible = !monsterStatsGroup.visible;
}

//Function that toggles on and off visibility of gameMenuGroup
function toggleGameMenuGroup(){
	gameMenuGroup.visible = !gameMenuGroup.visible;
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