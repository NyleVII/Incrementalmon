/* This is leftover garbage which only creates a single instance of an object

var monsterClass = {
    //Misc. stats
    name:"Monster Name",
    age: 0,
    birthday: 1,
    birthseason: "Spring",
    weight: 1,
    happiness: 100,
    hunger: 100,

    //Battle stats
    maxhp: 10,
    currenthp: 10,
    strength: 1,
    intelligence: 1,
    speed: 1,
    defence: 1,

    evoStage: "bit"
};
*/


function Monster(   name,
                    age,
                    birthday,
                    birthseason,
                    weight,
                    happiness,
                    hunger,
                    
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