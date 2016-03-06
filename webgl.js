function attachShaderFromSource(program, source, type) {
    shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
}

function init() {

    program = gl.createProgram();

    vertexSource = 'attribute vec2 p; \
            uniform float rot; \
            void main(){ \
                float s=sin(rot); \
                float c=cos(rot); \
                gl_Position = vec4( 0.5 * p * mat2(c,s,-s,c),1,1); \
            }';

    fragmentSource = 'void main() { \
            gl_FragColor=vec4(0,0,0,1); \
        }';

    attachShaderFromSource(program, vertexSource, gl.VERTEX_SHADER)
    attachShaderFromSource(program, fragmentSource, gl.FRAGMENT_SHADER)

    gl.linkProgram(program);
    gl.useProgram(program);
    gl.enableVertexAttribArray(0);

    rot = gl.getUniformLocation(program, 'rot');

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    vertices = new Float32Array([0, 1, -1, -1, 1, -1])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}

function draw() {
    t = 0;
    setInterval(function () {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(rot, t += 0.01);
        gl.drawArrays(4, 0, 3);
    }, 10);
}

gl = document.getElementById("glcanvas").getContext("webgl")
init()
draw()


