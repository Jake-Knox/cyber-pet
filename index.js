const test = null

const petNameP = document.getElementById("pet_name")
const nameChangeButton = document.getElementById("name_change_button")
const nameDiv = document.getElementById("name_change")
const nameChangeInput = document.getElementById("name_change_input")
const nameChangeSubmit = document.getElementById("name_change_submit")

nameChangeButton.addEventListener("click", () => {
    console.log("test")
    nameDiv.style.display = "block";
    nameChangeInput.value = petNameP.textContent;
        nameChangeButton.style.display = "none"
})

nameChangeSubmit.addEventListener("click", () => {
    console.log("test2")
    nameDiv.style.display = "none";
    petNameP.textContent = nameChangeInput.value;
    nameChangeButton.style.display = "block"

})