const canvas = document.getElementById("reloj");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius);

// Colores para el punto central (podés agregar más si querés)
const centroColores = [
    "red",
    "yellow",
    "white",
    "orange",
    "cyan",
    "lime"
];

function drawClock() {
    drawFace();
    drawMarks();
    drawHands();
    drawCenterDot();
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawMarks() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -radius + 15);
        ctx.lineTo(0, -radius + 30);
        ctx.stroke();
        ctx.rotate(-angle);
    }
}

function drawHands() {
    const now = new Date();
    const ms = now.getMilliseconds();

    let second = now.getSeconds() + ms / 1000;
    let minute = now.getMinutes() + second / 60;
    let hour = (now.getHours() % 12) + minute / 60;

    let secondAngle = second * (Math.PI / 30);
    let minuteAngle = minute * (Math.PI / 30);
    let hourAngle = hour * (Math.PI / 6);

    drawHand(hourAngle, radius * 0.50, 10, "red");
    drawHand(minuteAngle, radius * 0.75, 7, "red");
    drawHand(secondAngle, radius * 0.85, 4, "red");
}

function drawHand(angle, length, width, color = "red") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.rotate(angle);
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

function drawCenterDot() {
    const now = new Date();
    const sec = now.getSeconds();
    const colorIndex = sec % centroColores.length;

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);  // tamaño del punto
    ctx.fillStyle = centroColores[colorIndex];
    ctx.fill();
}

function update() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawClock();
    requestAnimationFrame(update);
}

update();
