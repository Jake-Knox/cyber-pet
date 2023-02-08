/**
 * Makes sure the number is never lower than min or higher than max
 * @param num Your number value.
 * @param min The minimum value the number can be.
 * @param max The maximum value the number can be.
 */
const Clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
}

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
        // do something when fed
    }

    clean() {
        // do something when cleaned
    }

    play() {
        // do something when played with
    }

    // this is a private method, can only be called from inside the class
    // adds health to the pet
    #addToHealth(value) {
        // Adds to the health and makes sures its never above the max health
        this.currentHealth = Clamp(this.currentHealth + value, -1, this.maxHealth);
    }

    // this is a private method
    // adds hunger to the pet
    #addToHunger(value) {
        // Adds to the hunger and makes sure its never above max hunger
        this.currentHunger = Clamp(this.currentHunger + value, 0, this.maxHunger);
    }

    // add happiness to the pet
    #addToHappiness(value) {
        // Adds to the happiness and makes sure its never above max happiness
        this.currentHappiness = Clamp(this.currentHappiness + value, 0, this.maxHappiness)
    }

    // removes health from the pet
    takeDamage(value) {
        // removes the value from the health and makes sure it never goes below -1
        this.currentHealth = Clamp(this.currentHealth - value, -1, this.maxHealth);
        
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

