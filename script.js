let clickCount = 0;

document.getElementById("rotating-image").addEventListener("click", function() {
    clickCount++;
    this.style.transition = "transform 0.5s ease";
    this.style.transform = "rotate(" + (1080 * clickCount) + "deg)";
});
