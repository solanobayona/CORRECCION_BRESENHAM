const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function plot(x, y) {
    ctx.fillRect(x, y, 1, 1);
}