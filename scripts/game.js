import { Clamp, petTypeEnum } from "./app.js";

// main game vars
let myPet = null;
let timeSurvived = 0;

// pictures
const godzilla_pic=document.getElementById("godzilla");
const kong_pic=document.getElementById("kong");
const sheep_pic=document.getElementById("sheep");
const rip_pic=document.getElementById("rip");

// status bars
const healthBar = document.getElementById("status-bar-health");
const hungerBar = document.getElementById("status-bar-hunger");
const thirstBar = document.getElementById("status-bar-thirst");
const happinessBar = document.getElementById("status-bar-happiness");
const uniqueBar = document.getElementById("status-bar-unique-ability");
const uniqueBarTitle = document.getElementById("unique-ability-title");

//buttons
const feedButton = document.getElementById("feed_button");
const drinkButton = document.getElementById("drink_button");
const playButton = document.getElementById("play_button");
const uniqueButton = document.getElementById("unique_button");
const killButton = document.getElementById("kill_button");

// audio sources
const reaperAudio = document.getElementById("reaperAudio");
reaperAudio.volume = 0.1; 

// remember to test out volume changes - some sounds may need different changes
const godzillaAudio1 = document.getElementById("godzilla_audio_1");
const godzillaAudio2 = document.getElementById("godzilla_audio_2");
const godzillaAudioUnique = document.getElementById("godzilla_audio_3");
const kingKongAudio1 = document.getElementById("kong_audio_1");
const kingKongAudio2 = document.getElementById("kong_audio_2");
const kingKongAudioUnique = document.getElementById("kong_audio_3");
const eSheepAudio1 = document.getElementById("sheep_audio_1");
const eSheepAudio2 = document.getElementById("sheep_audio_2");
const eSheepAudioUnique = document.getElementById("sheep_audio_3");


// pet name
const petNameTitle = document.getElementById("petName");
petNameTitle.textContent = localStorage.getItem("userSettingsPetName");

// sets pictures to hidden as default
godzilla_pic.style.display = "none";
kong_pic.style.display = "none";
sheep_pic.style.display = "none";
rip_pic.style.display = "none";

// gets the pet type in local storage
const petType = localStorage.getItem("userSettingsPetType");

// creates the pet when page is loaded
window.addEventListener("load", (event) => {
   
    // create out pet based on the users settings
    if(petType == petTypeEnum.electricSheep)
    {
        // create a sheep
        myPet = new ElectricSheep(localStorage.getItem("userSettingsPetName"),999,999,999,999,100);
        // show sheep, hide other pictures
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "block";
        rip_pic.style.display = "none";

        uniqueBarTitle.textContent = "charge"
        uniqueBar.style.backgroundColor = "rgb(43, 93, 255)";
        uniqueButton.innerText = "emp";
        
    }
    else if(petType == petTypeEnum.kingKong)
    {
        // create a kingkong
        myPet = new KingKong(localStorage.getItem("userSettingsPetName"),999,999,999,999,100)
        // show kong, hide other pictures
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "block";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";

        uniqueBarTitle.textContent = "rage"
        uniqueBar.style.backgroundColor = "rgb(255, 53, 38)";
        uniqueButton.innerText = "smash";
        
    } 
    else if(petType == petTypeEnum.godzilla)
    {
        // create a godzilla
        myPet = new Godzilla(localStorage.getItem("userSettingsPetName"),999,999,999,999,100)
        // show godzilla, hide other pictures
        godzilla_pic.style.display = "block";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";

        uniqueBarTitle.textContent = "radiation"
        uniqueBar.style.backgroundColor = "rgb(31, 255, 83)";
        uniqueButton.innerText = "roar";
        
    }
    else{
        //option for loading the game page without creating a pet first?
        myPet = new Godzilla(localStorage.getItem("userSettingsPetName"),999,999,999,999,100)
        // show godzilla, hide other pictures
        godzilla_pic.style.display = "block";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";

        uniqueBarTitle.textContent = "Radiation"
        uniqueBar.style.backgroundColor = "rgb(31, 255, 83)";
    }

    timingFunction();
    updateStatusBars();
})

//  BUTTON EVENT LISTENERS
feedButton.addEventListener("click", () => {

    myPet.feed();

})
drinkButton.addEventListener("click", () => {
    
    myPet.drink();

})
playButton.addEventListener("click", () => {
    
    myPet.play();

})
uniqueButton.addEventListener("click", () => {
    
    // change to unique ability
    myPet.unique();

})

killButton.addEventListener("click", ()=> {
    
    myPet.modifyHungerByValue(-9999);
    myPet.modifyThirstByValue(-9999);
    myPet.modifyHappinessByValue(-9999);
    if (petType == petTypeEnum.godzilla) {
        myPet.addToRadiation(-9999);
    } else if (petType == petTypeEnum.kingKong) {
        myPet.addToPower(-9999);
    } else if (petType == petTypeEnum.electricSheep) {
        myPet.addToCharge(-9999);
    };
    myPet.takeDamage(99999);
    updateStatusBars();
})


class BasePet {
    currentHealth = 999;
    currentHunger = 999;
    currentHappiness = 999;

    // Setting up the main values of the pet
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness) {
        this.name = name;

        // sets up the health
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;

        // sets up the hunger
        this.maxHunger = maxHunger;
        this.currentHunger = maxHunger;

        // sets up the thirst
        this.maxThirst = maxThirst;
        this.currentThirst = maxThirst;

        // sets up the happiness
        this.maxHappiness = maxHappiness;
        this.currentHappiness = maxHappiness;
        this.isDead = false;
    }

    feed() {
        if(this.isDead) return;
        // do something when fed
        this.modifyHungerByValue(10);
        logEvent("feeding pet");

        updateStatusBars();
    }

    drink() {
        if(this.isDead) return;
        // do something when drinking
        logEvent("drinking pet");
        this.modifyThirstByValue(10);

        updateStatusBars();
    }

    play() {
        if(this.isDead) return;
        // do something when played with
        logEvent("playing with pet");
        this.modifyHappinessByValue(10);

        updateStatusBars();

    }

    unique() {
        if(this.isDead) return;
        // do something for unique abiliy        
        logEvent("USING UNIQUE PET SUPER ABILITY");

    }

    // modifies health by value given
    modifyHealthByValue(value) {
        // Adds to the health and makes sures its never above the max health
        this.currentHealth = Clamp(this.currentHealth + value, 0, this.maxHealth);
    }

    // modifies hunger by value given
    modifyHungerByValue(value) {
        // Adds to the hunger and makes sure its never above max hunger
        this.currentHunger = Clamp(this.currentHunger + value, 0, this.maxHunger);
    }

    // modifies thirst by value given
    modifyThirstByValue(value) {
        // Adds to the hunger and makes sure its never above max hunger
        this.currentThirst = Clamp(this.currentThirst + value, 0, this.maxThirst);
    }

    // modifies happiness by value given
    modifyHappinessByValue(value) {
        // Adds to the happiness and makes sure its never above max happiness
        this.currentHappiness = Clamp(this.currentHappiness + value, 0, this.maxHappiness)
    }

    // removes health from the pet
    takeDamage(value) {
        this.modifyHealthByValue(-value)
        
        // if the health is lower than 0 after we removed the health, then die
        if(this.currentHealth <= 0) {
            this.#die();
        }
    }

    // function to heal - based on takeDamage
    heal(value) {
        this.modifyHealthByValue(value) 
    }

    // private method
    // called when the pet dies
    #die() {
        this.isDead = true;
        console.log("RIP PET IS DEAD");
        rip_pic.style.display = "block";
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        reaperAudio.play();
    }
}

// sheep class
class ElectricSheep extends BasePet {
    // tring to be consistent with naming conventions from earlier on 
    // and comment :)

    currentCharge = 999;
    isFrozen = false;
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxCharge) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness)

        this.maxCharge = maxCharge;
        this.currentCharge = 0;
        this.isFrozen = false;
    }

    modifyHealthByValue(value) {
        // so the player can increase still when sheep unique is used
        if (this.isFrozen && value < 0) return;
        super.modifyHealthByValue(value);
    }

    modifyHappinessByValue(value) {
        // so the player can increase still when sheep unique is used
        if (this.isFrozen && value < 0) return;
        super.modifyHappinessByValue(value);
    }

    modifyThirstByValue(value) {
        // so the player can increase still when sheep unique is used
        if(this.isFrozen && value < 0) return;
        super.modifyThirstByValue(value);
    }

    modifyHungerByValue(value) {
        // so the player can increase still when sheep unique is used
        if (this.isFrozen && value < 0) return;
        super.modifyHungerByValue(value);
    }

    unique(){
        // method that first calls common pet function for unique (the event log) 
        // then does somethign else - plays sheep audio
        if(this.currentCharge == this.maxCharge){
            super.unique();
            eSheepAudioUnique.play();
            this.currentCharge = 0;

            this.isFrozen = true;

            // disables it after 10 seconds
            setTimeout(() => {
                this.isFrozen = false;
            }, 10000) // takes 10 seconds
        }        
    }

    // function for sheep only to add charge 
    addToCharge(value){
        this.currentCharge = Clamp(this.currentCharge + value, 0, this.maxCharge)
    }
}


class KingKong extends BasePet {

    currentPowerness = 999;
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxPowerness) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness);

        this.maxPowerness = maxPowerness;
        this.currentPowerness = 0;
    }

    unique(){
        // method that first calls common pet function for unique (the event log) 
        // then does somethign else -
        if(this.currentPowerness == this.maxPowerness){
            super.unique();
            kingKongAudioUnique.play();
            this.currentPowerness = 0;

            // is this okay?
            this.modifyHealthByValue(9999);
        }  
    }

    // Adds to the power and makes sure it never goes below 0 or above the max powerness
    addToPower(value) {
        this.currentPowerness = Clamp(this.currentPowerness + value, 0, this.maxPowerness);
    }
}

class Godzilla extends BasePet {
    currentRadiation = 999;
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxRadiation) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness);

        this.maxRadiation = maxRadiation;
        this.currentRadiation = 0;

    }

    unique(){
        // method that first calls common pet function for unique (the event log) 
        // then does somethign else -
        if(this.currentRadiation == this.maxRadiation){
            super.unique();
            godzillaAudioUnique.play();
            this.currentRadiation = 0;

            // is this okay?
            this.modifyHungerByValue(750);
            this.modifyThirstByValue(750);
            this.modifyHappinessByValue(-150);            
        } 
    }

    addToRadiation(value) {
        this.currentRadiation = Clamp(this.currentRadiation + value, 0, this.maxRadiation);
    }
}

// Achievement constructor
class Achievement {
    constructor(name, description, image, func) {
        this.name = name;
        this.description = description;
        this.requirement = func;
        this.image = image;
        this.completed = false;
    }

    // Checks if the achievement is complete
    requirement() {
        return false;
    }
}

// Our list of achievements and where we create them
const AchievementList = [
    new Achievement("Trainee Handler", "Survive over 30 seconds", "../images/babysheep.png", () => {
        // The requirement for the achievement being over written
        return timeSurvived >= 30; // returns as a boolean
    }),
    new Achievement("No Life", "Survive over 10 Minutes, Nice carpel tunnel syndrome", "../images/babysheep.png", () => {
        // The requirement for the achievement being over written
        return timeSurvived >= 600; // returns as a boolean
    }),
]

// Loops through our achievement list and checks if we've completed it
const checkAchievements = () => {
    for (let i = 0; i < AchievementList.length; i++) {
        const achievement = AchievementList[i];
        // Skips this achievement, no need to check anything
        if(achievement.completed) {
            continue;
        }

        // Checks if the achievement requirements have been met and if they have, complete it
        if(achievement.requirement()) {
            achievement.completed = true;
            createAchievement(achievement);
            logEvent(`Player has unlocked the ${achievement.name} achievement! Well done!`)
        }
    }
}

const achievementParent = document.getElementById("achievement-wrapper");
const createAchievement = (achievement) => {
    const achievementBase = document.createElement("div");
    achievementBase.classList.add("achievement")
    achievementParent.append(achievementBase);

    const achievementImage = document.createElement("img");
    achievementImage.src = achievement.image;
    achievementBase.append(achievementImage);

    const achievementTextWrapper = document.createElement("div");
    achievementBase.append(achievementTextWrapper);

    const achievementTitle = document.createElement("h1");
    achievementTitle.textContent = achievement.name;
    achievementTextWrapper.append(achievementTitle);

    const achievementDesc = document.createElement("h2");
    achievementDesc.textContent = achievement.description;
    achievementTextWrapper.append(achievementDesc);

    window.setTimeout(() => {
        achievementBase.remove();
    }, 5000) // Destroys after 5 seconds
}


// function runs every second, updates pet stats and updates the status bars
const timingFunction = () => {
    window.setInterval(() => {
        // updates time survived
        if(myPet.isDead) return;

        timeSurvived++;

        // modifies our pet
        myPet.modifyHungerByValue(-10);
        myPet.modifyThirstByValue(-10);
        myPet.modifyHappinessByValue(-15);
        myPet.takeDamage(calculateDamage());

        // Adds to unique stats
        if(petType == petTypeEnum.godzilla)  {
            myPet.addToRadiation(2);
        } else if (petType == petTypeEnum.kingKong) {
            myPet.addToPower(2);
        } else if (petType == petTypeEnum.electricSheep) {
            myPet.addToCharge(2);
        }

        // important checks
        checkAchievements();
        updateStatusBars();
        lightUniqueButton();
    },1000); // every 1 second
}

// As the happiness, hunger and thirst get lower, the pet will take more damage
const calculateDamage = () => {
    const hungerPercentage = (myPet.currentHunger / myPet.maxHunger) * 100;
    const thirstPercetange = (myPet.currentThirst / myPet.maxThirst) * 100;
    const happinessPercentage = (myPet.currentHappiness / myPet.maxHappiness) * 100;
    
    const hungerDamage = (100 - hungerPercentage) / 7
    const thirstDamage = (100 - thirstPercetange) / 7
    const happinessDamage = (100 - happinessPercentage) / 10

    let totalDamage = hungerDamage + thirstDamage + happinessDamage
    // change 5 when testing
    if (totalDamage > 5) {
        // return hungerDamage + thirstDamage + happinessDamage
        return totalDamage;
    }
    else{
        return 0;
    }
    
    
}

const updateStatusBars = () => {
    // Updates the width by getting the percentage of the max health
    healthBar.style.width=`${(myPet.currentHealth / myPet.maxHealth) * 100}%`;
    hungerBar.style.width=`${(myPet.currentHunger / myPet.maxHunger) * 100}%`;
    thirstBar.style.width=`${(myPet.currentThirst / myPet.maxThirst) * 100}%`;
    happinessBar.style.width = `${(myPet.currentHappiness / myPet.maxHappiness) * 100}%`;

    // Updates the states of the unique bars depending on the pet
    if(petType == petTypeEnum.godzilla) {
        uniqueBar.style.width = `${(myPet.currentRadiation / myPet.maxRadiation) * 100}%`;
    } else if (petType == petTypeEnum.kingKong) {
        uniqueBar.style.width = `${(myPet.currentPowerness / myPet.maxPowerness) * 100}%`;
    } else if (petType == petTypeEnum.electricSheep) {
        uniqueBar.style.width = `${(myPet.currentCharge / myPet.maxCharge) * 100}%`;
    }
}

// light up unique button with respective colour when unique bar full
const lightUniqueButton = () => {
    if ( (petType == petTypeEnum.godzilla) && (myPet.currentRadiation == myPet.maxRadiation) ) {
        uniqueButton.style.backgroundColor= "rgb(31, 255, 83)";
        uniqueButton.style.borderColor= "rgb(31, 255, 83)";
        uniqueButton.style.color="black";
    } else if ( (petType == petTypeEnum.kingKong) && (myPet.currentPowerness == myPet.maxPowerness) ) {
        uniqueButton.style.backgroundColor= "rgb(255, 53, 38)";
        uniqueButton.style.borderColor= "rgb(255, 53, 38)";
        uniqueButton.style.color="black";
    } else if ( (petType == petTypeEnum.electricSheep) && (myPet.currentCharge == myPet.maxCharge) ) {
        uniqueButton.style.backgroundColor= "rgb(43, 93, 255)";
        uniqueButton.style.borderColor= "rgb(43, 93, 255)";
        uniqueButton.style.color="black";
    } else {
        uniqueButton.style.backgroundColor="#57402b";
        uniqueButton.style.borderColor="#a8896c";
        uniqueButton.style.color="#61b292";
    }
}

// Feature to add an event message to the event log
// call logEvent - pass in the full message for the log
// messages are deleted after X (5) seconds from the top of the list
const eventLogUL = document.querySelector("#events_list")
// console.log(eventLogUL)

const logEvent = (message) => {
    // create the new message element
    const newLog = document.createElement("li");
    
    // const logContent = document.(message);
    // add new log to the list - visible on page
    // newLog.appendChild(logContent);

    // eventLogUL.appendChild(newLog); // adds at bottom of log list
    eventLogUL.prepend(newLog); // adds at top of log
    newLog.innerHTML = (`<p class="event_text">${message}</p>`)

    // set a timeout for each log - x seconds after creation
    window.setTimeout(() => {
        // const firstLog = document.querySelector("#events_list:first-child")
        const firstLog = document.querySelector("li:last-child") // remove bottom element
        eventLogUL.removeChild(firstLog)
    }, 5000); // change lifespan of a single log
}