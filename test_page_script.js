const godzilla_pic=document.getElementById("godzilla");
const kong_pic=document.getElementById("kong");
const sheep_pic=document.getElementById("sheep");

const godzilla_button=document.getElementById("godzilla_button");
const kong_button=document.getElementById("kong_button");
const sheep_button=document.getElementById("sheep_button");

godzilla_pic.style.display = "none";
kong_pic.style.display = "none";
sheep_pic.style.display = "none";
// sets pictures to hidden as default

godzilla_button.addEventListener("click", ()=> {
    if (godzilla_pic.style.display == "none") {
        godzilla_pic.style.display = "block";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        godzilla_button.style.display = "none";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})

kong_button.addEventListener("click", ()=> {
    if (kong_pic.style.display == "none") {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "block";
        sheep_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "none";
        sheep_button.style.display = "block";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})

sheep_button.addEventListener("click", ()=> {
    if (sheep_pic.style.display == "none") {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "block";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "none";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})

// each button shows its own pic and hides itself, shows other buttons