/**
 * Makes sure the number is never lower than min or higher than max
 * @param num Your number value.
 * @param min The minimum value the number can be.
 * @param max The maximum value the number can be.
 */
const Clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
}

const userSettings = {
    name: "",
    petType: "",
}

export { userSettings, Clamp };