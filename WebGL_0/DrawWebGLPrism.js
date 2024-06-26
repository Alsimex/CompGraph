// DrawWebGLPrism.js
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.75, 0.75, 1.0, 1.0);\n' +
  '}\n';

function main() {
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
  //gl.clearColor(1, 1, 1, 1);

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);

  color = (0.75, 0.75, 1.0, 1.0);

  var v1 = new Float32Array([
    -1, 0,   -0.5, 1,   -0.6, -0.17,
  ]);
  
  var v2 = new Float32Array([
    0, 0,   -0.5, 1,   -0.6, -0.17,
  ]);
  
  var v3 = new Float32Array([
    -1, 0,   -0.5, -1,   -0.6, -0.17,
  ]);
  
  var v4 = new Float32Array([
    0, 0,   -0.5, -1,   -0.6, -0.17,
  ]);

  // Set first color
  FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.785, 0.785, 1.0, 1.0);\n' +
  '}\n';
  
  // Reinitialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Draw the first triangle
  drawTriangle(gl, v1);

  // Set second color
  FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.295, 0.295, 1.0, 1.0);\n' +
  '}\n';
  
  // Reinitialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  // Draw the second triangle
  drawTriangle(gl, v2);
  
  // Set third color
  FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0.215, 0.215, 1.0, 1.0);\n' +
  '}\n';
  
  // Reinitialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  // Draw the third triangle
  drawTriangle(gl, v3);
  
  // Set fourth color
  FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(0, 0, 0.47, 1.0);\n' +
  '}\n';
  
  // Reinitialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  // Draw the fourth triangle
  drawTriangle(gl, v4);
}

function drawTriangle(gl, vertices) {
  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl, vertices);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }
  
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl, vertices) {
  /*
  var vertices = new Float32Array([
    -1, 0,   -0.5, 1,   -0.5, 0,
  ]);
  */
  
  var n = 3; // The number of vertices

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
