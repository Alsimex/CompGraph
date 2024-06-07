// GetToThePoint.js
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

var max = 0.9;
var min = -0.9;
var vertex;

var clicked = 0;

var times = [];

function main() {
  /*// Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.9, 0.9, 0.9, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);*/
  
  //startGame();
}

function startGame() {
  // Change the button text
  var btn = document.getElementById("button1");
  if (btn.innerText == "Click here to start!") changeButton();
	
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw first point
  newPoint();
  drawPoint(gl);
  
  // Reset click counter
  clicked = 0;
  
  // Set starting time
  var start = Date.now();
    
  canvas.onmousedown = function(ev){click(ev, gl, canvas, vertex, start); };
}

// Change button text
function changeButton() {
	var btn = document.getElementById("button1");
    if (btn.innerText == "Click here to start!") btn.innerText = "Click here to restart!";
    else btn.innerText = "Click here to start!";
	return;
}

// Randomize point location
function newPoint() {
  x = (Math.random() * (max - min) + min);
  y = (Math.random() * (max - min) + min);
  vertex = new Float32Array([
    x, y, 0
  ]);
}

function click(ev, gl, canvas, v, start) {
  // Check if enough points have been clicked
  if (clicked >= 10) return;
	
  // Set bounding box for point
  let maxX = Math.ceil(((v[0]*256)+256)+5);
  let minX = Math.floor(((v[0]*256)+256)-5);
  let maxY = Math.ceil(((-v[1]*256)+256)+5);
  let minY = Math.floor(((-v[1]*256)+256)-5);
  
  /*
  // test code
  console.log("maxX: " + maxX);
  console.log("minX: " + minX);
  
  console.log("maxY: " + maxY);
  console.log("minY: " + minY);
  
  console.log("clickX: " + ev.offsetX);
  console.log("clickY: " + ev.offsetY);
  */
  
  // Check if point was clicked
  if (ev.offsetX < maxX && ev.offsetX > minX 
  && ev.offsetY < maxY && ev.offsetY > minY) {
    //console.log("clicked");
	
	// Store each time in milliseconds
	times[clicked] = Date.now() - start;
	
	
	// Check if enough points have been clicked
	if (clicked >= 9) {
	  //console.log("That's enough!");
	  
	  // Calc best and average times
	  var bestTime = times[clicked];
	  var aveTime = times[clicked];
	  for (let i = 0; i < clicked; i++) {
		if (times[i] < bestTime) {
		  bestTime = times[i];
		  aveTime = aveTime + times[i];
		}
      }
	  aveTime = Math.round(aveTime/10);
	  
	  //console.log(bestTime);
	  //console.log(aveTime);

	  // Display times
	  gl.clear(gl.COLOR_BUFFER_BIT);
	  alert("Your best time was: " + bestTime + "ms\n"
	  + "Your average time was: " + aveTime + "ms");
	  
	  // Reset button text
	  changeButton();
	  
	  return;
	}
	
	clicked++;
	
	// Draw the next point
	newPoint();
	drawPoint(gl);
  }
  
}

// Draws a new point
function drawPoint(gl) {
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  // Write the position of vertex to a vertex shader
  var n = initVertexBuffers(gl, vertex);
  if (n < 0) {
    console.log('Failed to set the positions of the vertex');
    return;
  }
  
  gl.drawArrays(gl.POINTS, 0, 1);
  
  return vertex;
}

function initVertexBuffers(gl, vertices) {
  /*
  var vertices = new Float32Array([
    -1, 0,   -0.5, 1,   -0.5, 0,
  ]);
  */
  
  var n = 1; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}