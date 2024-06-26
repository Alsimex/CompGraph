// TessAndTwist.js
// Dayton McManus

// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';
  
// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';
  
// number of tessellations  
var tessCount = 4;

// twist angle in degrees
var twistTheta = 90;

// list of final points
var points = [];

function main() {
  init(tessCount, twistTheta);
}

function init(count, theta) {
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
  gl.clearColor(1, 1, 1, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // set starting points for triangles
  var vertices = [
	vec2(0, 1),
    vec2(0.86602540378, -0.5),
    vec2(-0.86602540378,  -0.5)
  ];
  
  // prevent tessellation issues
  if (count > 5) count = 5;
  if (count < -1) count = 0;
  
  // set starting values
  tessCount = count;
  twistTheta = theta;
  
  // generate points for tessellated triangles
  points = [];
  tessTriangles(tessCount, vertices[0], vertices[1], vertices[2]);
  
  // render triangles
  initVertexBuffers(gl, flatten(points));
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
  gl.drawArrays( gl.TRIANGLES, 0, points.length );
  
  points = [];	
}

function twistTriangles(theta, p) {
  // get coordinates
  var px = p[0];
  var py = p[1];
  
  // convert theta to radians
  theta = Math.PI * theta / 180
  
  // calc distance from origin times theta
  var dTheta = Math.sqrt(Math.pow(px, 2) + Math.pow(py, 2)) * theta;

  // calc twisted points
  var result = vec2(((Math.cos(dTheta)) * px) - ((Math.sin(dTheta)) * py),
      ((Math.sin(dTheta)) * px) + ((Math.cos(dTheta)) * py));
  return result;
  
}

function tessTriangles(count, a, b, c) {
  
  // check for last recursion
  if (count == 0) {
	triangle(a, b, c);
  } else {
	// divide edges
	var ab = mix(a, b, 0.5);
	var ac = mix(a, c, 0.5);
	var bc = mix(b, c, 0.5);
	
	count--;
	
	// divide new triangles
	tessTriangles(count, a, ab, ac);
	tessTriangles(count, c, ac, bc);
	tessTriangles(count, b, bc, ab);
  }
}

function triangle(a, b, c) {
  a = twistTriangles(twistTheta, a);
  b = twistTriangles(twistTheta, b);
  c = twistTriangles(twistTheta, c);
  
  points.push(a, b, c);
}

function initVertexBuffers(gl, vertices) {
  
  var n = points.length; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);

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