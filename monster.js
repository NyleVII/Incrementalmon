

//Function prototype for creating new instances of monsters
function Monster(   //Misc. stats
                    name,
                    age,
                    birthday,
                    birthseason,
                    weight,
                    happiness,
                    hunger,
                    
                    //Battle stats
                    maxhp,
                    currenthp,
                    strength,
                    intelligence,
                    speed,
                    defence,
                    
                    evoStage){
    this.name = name;
    this.age = age;
    this.birthday = birthday;
    this.birthseason = birthseason;
    this.weight = weight;
    this.happiness = happiness;
    this.hunger = hunger;

    this.maxhp = maxhp;
    this.currenthp = currenthp;
    this.strength = strength;
    this.intelligence = intelligence;
    this.speed = speed;
    this.defence = defence;

    this.evoStage = evoStage;
}

/*
MONSTER CLASSES:
Class Elite
Class SSS
Class SS
Class S
Class A
Class B
Class C
CLass E

*/

// var player = new Monster("Nyle", 0, 1, "Spring", 2, 100, 100, 10, 10, 1, 1, 1, 1, "Bit");
var randomNames = [ "Saitama",
                    "Boros",
                    "Nyle",
                    "Anix",
                    "Teq",
                    "Gocky",
                    "Bankai",
                    "Yshtola",
                    "Bahamut",
                    "Groribas",
                    "Kain",
                    "Cecil",
                    "Celes",
                    //Witcher
                    "Geralt",
                    "Roche",
                    "Iorveth",
                    "Triss",
                    "Yennefer",
                    "Ciri",
                    "Prometherion",
                    "Kryptikk",
                    "Arwen",
                    "Ayewin",
                    "Beerus",
                    "Sargeras",
                    "Sailon",
                    "Thane",
                    "Araenea",
                    "Arthas",
                    "Terra",
                    "Bleb Bleb",
                    "Sonic",
                    "Sauron",
                    "Smaug",
                    "Mog'Darsh",
                    //FFXV character names
                    "Ardyn",
                    "Noctis",
                    "Gladio",
                    "Ignis",
                    "Prompto",
                    //Mythology
                    "Odyn",
                    "Thor",
                    "Fenrir",
                    "Asator",
                    //submitted
                    "Shan",
                    "Virul",

                    
                    "Ash"
                    ];