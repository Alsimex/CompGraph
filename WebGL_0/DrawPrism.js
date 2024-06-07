// DrawTriangle.js
function main() {
// Retrieve <canvas> 
var canvas = document.getElementById('html5');
if (!canvas) {
console.log('Failed to retrieve the <canvas> element');
return;
}

// Get the rendering context for 2DCG
var ctx = canvas.getContext('2d');

// Draw the first triangle 
ctx.fillStyle = 'rgba(200, 200, 255, 1.0)';
ctx.beginPath();
ctx.moveTo(0,255);
ctx.lineTo(127,0);
ctx.lineTo(100,300);
ctx.fill();

// Draw the second triangle 
ctx.fillStyle = 'rgba(75, 75, 255, 1.0)';
ctx.beginPath();
ctx.moveTo(255,255);
ctx.lineTo(127,0);
ctx.lineTo(100,300);
ctx.fill();

// Draw the second triangle 
ctx.fillStyle = 'rgba(55, 55, 255, 1.0)';
ctx.beginPath();
ctx.moveTo(0,255);
ctx.lineTo(127,511);
ctx.lineTo(100,300);
ctx.fill();

// Draw the second triangle 
ctx.fillStyle = 'rgba(0, 0, 120, 1.0)';
ctx.beginPath();
ctx.moveTo(255,255);
ctx.lineTo(127,511);
ctx.lineTo(100,300);
ctx.fill();

}