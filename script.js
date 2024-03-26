let clickCount = 0;

document.getElementById("rotating-image").addEventListener("click", function() {
    clickCount++;
    this.style.transition = "transform 0.5s ease";
    this.style.transform = "rotate(" + (1080 * clickCount) + "deg)";

    let buttons = document.querySelectorAll('.corner-button');
    buttons.forEach(button => {
        if(clickCount % 2 !== 0) { // Mostrar botones
            button.style.opacity = "1";
            button.style.transform = "translate(0, 0)";
        } else { // Ocultar botones
            let id = button.id;
            let transform = "";
            if(id === "top-left") transform = "translate(-100%, -100%)";
            if(id === "top-right") transform = "translate(100%, -100%)";
            if(id === "bottom-left") transform = "translate(-100%, 100%)";
            if(id === "bottom-right") transform = "translate(100%, 100%)";
            button.style.opacity = "0";
            button.style.transform = transform;
        }
    });
});
