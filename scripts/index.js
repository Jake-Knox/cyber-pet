import { petTypeEnum } from "./app.js" 

// Pet changing
const petNameP = document.getElementById("pet_name")
const nameChangeButton = document.getElementById("name_change_button")
const nameDiv = document.getElementById("name_change")
const nameChangeInput = document.getElementById("name_change_input")
const nameChangeSubmit = document.getElementById("name_change_submit")

// Pet preview stuff
const petChangeTypeBox = document.getElementById("pet-selection-box");
const petChangePreview = document.getElementById("pet-creation-preview-img");
const petCreationButton = document.getElementById("pet-creation-submit-button");

const previewImages = {
    ["godzilla"]: "../images/godzilla.jpg",
    ["king kong"]: "../images/kong.jpg",
    ["electric sheep"]: "../images/sheep.jpg",
}

const currentUserSettings = {
    name: "",
    petType: petTypeEnum.godzilla,
}

// set name change input box and submit button invisible to start
nameChangeSubmit.style.display = "none";
nameChangeInput.style.display = "none";

nameChangeButton.addEventListener("click", () => {
    // Shows the popup
    nameDiv.style.display = "block";
    nameChangeInput.value = petNameP.textContent;
    nameChangeButton.style.display = "none";
    nameChangeSubmit.style.display = "block";
    nameChangeInput.style.display = "block";
})

nameChangeSubmit.addEventListener("click", () => {
    // Changes preview to invisible
    nameDiv.style.display = "none";
    petNameP.textContent = nameChangeInput.value;
    nameChangeButton.style.display = "block"

    // Updates user settings
    currentUserSettings.name = nameChangeInput.value;
})

// Called whenever we change the value
petChangeTypeBox.addEventListener("change", (event) => {
    // Updates image
    const petType = event.target.value.toLowerCase();
    petChangePreview.src = previewImages[petType];
    // Updates user settings
    switch(petType) {
        case "godzilla":
            currentUserSettings.petType = petTypeEnum.godzilla;
            break;
        case "king kong":
            currentUserSettings.petType = petTypeEnum.kingKong;
            break;
        case "electric sheep":
            currentUserSettings.petType = petTypeEnum.electricSheep;
            break;
    }
})

petCreationButton.addEventListener("click", () => {
    // userSettings.name = currentUserSettings.name;
    // userSettings.petType = currentUserSettings.petType;
    window.location.href = "../html/test_page.html"
    localStorage.setItem("userSettingsPetName", currentUserSettings.name)
    localStorage.setItem("userSettingsPetType", currentUserSettings.petType.toString())
})