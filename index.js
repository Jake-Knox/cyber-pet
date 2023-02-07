const test = null


const nameChangeButton = document.getElementById("name_change_button")
const nameDiv = document.getElementById("name_change")
const nameChangeInput = document.getElementById("name_change_input")
const nameChangeSubmit = document.getElementById("name_change_submit")

nameChangeButton.addEventListener("click", () => {
    nameDiv.style.display = "block"
})