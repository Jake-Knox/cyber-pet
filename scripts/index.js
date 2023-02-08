import { userSettings } from "./app.js" 

// Pet changing
const petNameP = document.getElementById("pet_name")
const nameChangeButton = document.getElementById("name_change_button")
const nameDiv = document.getElementById("name_change")
const nameChangeInput = document.getElementById("name_change_input")
const nameChangeSubmit = document.getElementById("name_change_submit")

// Pet preview stuff
const petChangeTypeBox = document.getElementById("pet-selection-box");
const petChangePreview = document.getElementById("pet-creation-preview-img");

const previewImages = {
    ["godzilla"]: "../images/godzilla.jpg",
    ["king kong"]: "../images/kong.jpg",
    ["electric sheep"]: "../images/sheep.jpg",
}

nameChangeButton.addEventListener("click", () => {
    // Shows the popup
    nameDiv.style.display = "block";
    nameChangeInput.value = petNameP.textContent;
    nameChangeButton.style.display = "none"
})

nameChangeSubmit.addEventListener("click", () => {
    // Changes preview to invisible
    nameDiv.style.display = "none";
    petNameP.textContent = nameChangeInput.value;
    nameChangeButton.style.display = "block"

    // Updates user settings
    userSettings.name = nameChangeInput.value;
})

// Called whenever we change the value
petChangeTypeBox.addEventListener("change", (event) => {
    // Updates image
    const petType = event.target.value.toLowerCase();
    petChangePreview.src = previewImages[petType];
    // Updates user settings
    userSettings.petType = petType;
    console.log(userSettings.petType);
})