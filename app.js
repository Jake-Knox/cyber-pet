class BasePet {
    currentHealth = 999;
    currentHunger = 999;
    currentHappiness = 999;

    // Setting up the main values of the pet
    constructor(name, maxHealth, maxHunger, maxHappines) {
        this.name = name;

        // sets up the health
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;

        // sets up the hunger
        this.maxHunger = maxHunger;
        this.currentHunger = maxHunger;

        // sets up the happiness
        this.maxHappiness = maxHappines;
        this.currentHappiness = maxHappines;
    }

    feed() {
        // add to hunger
    }

    clean() {
        // add to happiness
    }

    play() {
        // add to happiness
    }

    drink() {
        // add to something, unsure yet
    }

    // this is a private method, can only be called from inside the class
    // adds health to the pet
    #heal(value) {
        // Prevents the player from having health higher than max
        if (!(this.currentHealth + value > this.maxHealth)) {
            this.currentHealth = this.maxHealth;
            return;
        }

        // Adds to the health
        this.currentHealth += value;
    }

    // this is a private method
    // adds hunger to the pet
    #replenish(value) {
        // Prevents the player from having replenishment higher than max
        if (!(this.currentHappiness + value > this.maxHappiness)) {
            this.maxHappiness = this.maxHappiness;
            return;
        }

        // Adds to the happiness
        this.maxHappiness += value;
    }

    // this is a private method
    // removes health from the pet
    #takeDamage(value) {
        this.currentHealth -= value;
        
        // if the health is lower than 0 after we removed the health, then die
        if(this.currentHealth <= 0) {
            this.#die();
        }
    }

    // private method
    // called when the pet dies
    #die() {
        // do something on pet death
    }
}