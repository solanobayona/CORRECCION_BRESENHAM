const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const SIZE = 600; // Nuevo tamaño

function plot(x, y) {
    ctx.fillStyle = "#00e676";
    // Sombra para efecto neón
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#00e676";
    ctx.fillRect(x, SIZE - y, 2, 2);
    ctx.shadowBlur = 0;
}

function bresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    const tbody = document.querySelector("#tabla tbody");

    while (true) {
        plot(x0, y0);
        
        // Agregar fila
        let row = tbody.insertRow();
        row.insertCell(0).innerText = x0;
        row.insertCell(1).innerText = y0;
        row.insertCell(2).innerText = err;

        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

function dibujarEjes() {
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 1;
    ctx.font = "10px monospace";
    ctx.fillStyle = "#555";

    for (let i = 0; i <= SIZE; i += 50) {
        // Líneas de cuadrícula
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, SIZE); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke();
        
        // Números de referencia
        ctx.fillText(i, i + 2, SIZE - 5);
        if (i > 0) ctx.fillText(i, 5, SIZE - i - 5);
    }
}

function dibujar() {
    let x0 = parseInt(document.getElementById("x0").value) || 0;
    let y0 = parseInt(document.getElementById("y0").value) || 0;
    let x1 = parseInt(document.getElementById("x1").value) || 0;
    let y1 = parseInt(document.getElementById("y1").value) || 0;

    // Limpiar
    ctx.clearRect(0, 0, SIZE, SIZE);
    document.querySelector("#tabla tbody").innerHTML = "";
    
    dibujarEjes();
    bresenham(x0, y0, x1, y1);
}

// Inicialización
dibujarEjes();