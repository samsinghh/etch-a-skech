const grid = document.getElementById("container");
const resizebtn = document.getElementById("btn");
const resetbtn = document.getElementById("resetbtn");
const containerSize = 640;

let mouseDown = false;

grid.addEventListener("mousedown", () => {mouseDown = true});
grid.addEventListener("mouseup", () => {mouseDown = false});

function buildGrid(n) {
    const squareSize = containerSize / n;
    grid.style.width = grid.style.height = containerSize + "px";
    grid.innerHTML = "";

    for (let i = 0; i < n * n; i++) {
        const square = document.createElement("div");
        square.style.width = square.style.height = squareSize + "px";
        square.classList.add("square");
        let r = Math.random() * 256;
        let g = Math.random() * 256;
        let b = Math.random() * 256;
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        square.style.opacity = "0";
        
        square.addEventListener("mouseover", () => {
            let current = parseFloat(window.getComputedStyle(square).opacity);
            current = Math.min(current + 0.1, 1);
            if (mouseDown) square.style.opacity = current;
        });

        square.addEventListener("mousedown", () => {
            let current = parseFloat(window.getComputedStyle(square).opacity);
            current = Math.min(current + 0.1, 1);
            square.style.opacity = current;
        })
        grid.appendChild(square);
    }

}


function resize() {
    let n = parseInt(prompt("How many squares per side? (1-100)"), 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 100) n = 100;
    buildGrid(n);
}

function reset() {
    const buttons = document.querySelectorAll(".square");
    buttons.forEach((button) => {
        button.style.opacity = 0;
    });
    
}

resizebtn.addEventListener("click", resize);
resetbtn.addEventListener("click", reset);

buildGrid(16);