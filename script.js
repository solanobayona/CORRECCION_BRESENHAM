const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Función para pintar el píxel
function plot(x, y) {
    // Usamos 2x2 para que se vea mejor el punto en un canvas de 400px
    ctx.fillRect(x, canvas.height - y, 2, 2);
}

function bresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plot(x0, y0);
        agregarFila(x0, y0, err); // Actualiza la tabla en cada paso

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function dibujar() {
    let x0 = parseInt(document.getElementById("x0").value) || 0;
    let y0 = parseInt(document.getElementById("y0").value) || 0;
    let x1 = parseInt(document.getElementById("x1").value) || 0;
    let y1 = parseInt(document.getElementById("y1").value) || 0;

    // 1. Limpiar todo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    limpiarTabla();
    
    // 2. Dibujar guía visual
    dibujarEjes();
    
    // 3. Ejecutar algoritmo
    ctx.fillStyle = "red"; // Color de la línea
    bresenham(x0, y0, x1, y1);
}

function limpiarTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "<tr><th>x</th><th>y</th><th>err</th></tr>";
}

function agregarFila(x, y, err) {
    let tabla = document.getElementById("tabla");
    let fila = tabla.insertRow(-1);
    fila.insertCell(0).innerHTML = x;
    fila.insertCell(1).innerHTML = y;
    fila.insertCell(2).innerHTML = err;
}

function dibujarEjes() {
    ctx.fillStyle = "#ccc"; // Color gris para los ejes
    for (let i = 0; i <= 400; i += 50) {
        ctx.fillText(i, i, canvas.height - 5);
        ctx.fillText(i, 5, canvas.height - i);
    }
}

// Dibujar ejes al cargar la página por primera vez
dibujarEjes();