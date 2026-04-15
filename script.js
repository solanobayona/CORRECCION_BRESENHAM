const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function plot(x, y) {
    ctx.fillRect(x, canvas.height - y, 1, 1);
}
function bresenham(x0, y0, x1, y1, plot) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plot(x0, y0);

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
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bresenham(x0, y0, x1, y1, plot);
}
function limpiarTabla() {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "<tr><th>x</th><th>y</th><th>err</th></tr>";
}
function agregarFila(x, y, err) {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML += `<tr><td>${x}</td><td>${y}</td><td>${err}</td></tr>`;
}
function dibujar() {
    limpiarTabla();
}
agregarFila(x0, y0, err);
function dibujarEjes() {
    for (let i = 0; i <= 400; i += 50) {
        ctx.fillText(i, i, 395);
        ctx.fillText(i, 0, 400 - i);
    }
}
