var holeSize = 100; // size of the black hole.
var rotationDistance = 200; // distance of black hole from canvas center.
var rotationSpeed = 1; // speed of black hole rotation.
var spawnCount = 20;  // the amount of stars to spawn every frame.
var rotationStep = 37;

// ---------------------------------------------

var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    stars = [],
    m = {},
    r = 0,
    accel = 1.01,
    accel2 = 0.001,
    ratio = window.devicePixelRatio || 1,
    spawnPos = 0,
    randomize = true
	
canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;

m.x = null;
m.y = null;

ctx.strokeStyle = '#fff';
ctx.translate(0.5, 0.5);

// create stars
function createStars(n){
  
    if(m.x === null) return;
  
    for(var i=0;i<n;i++){
        var shape = {
            x: m.x,
            y: m.y,
            r: 1,
            speed: 1,
            accel: accel,
            accel2: accel2,
            angle: randomize ? Math.random() * 360 : spawnPos
        }
        
        if(!randomize) spawnPos += rotationStep;

        var vel = {
            x: holeSize * Math.cos(shape.angle * Math.PI / 180),
            y: holeSize * Math.sin(shape.angle * Math.PI / 180)
        };

        shape.x += vel.x;
        shape.y += vel.y;

        stars.push(shape);
    }
}

function render(){
    createStars(spawnCount);

    var bench = [];
    // ctx.save();
    // ctx.fillStyle = 'rgba(0,0,0,0.5)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.restore();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    r+=rotationSpeed;
    if(r < 360){
        m = { x: canvas.width / 2, y: canvas.height / 2, angle: r }
        
        var targetAngle = m.angle * Math.PI / 180;

        m.x += rotationDistance * Math.cos(targetAngle);
        m.y += rotationDistance * Math.sin(targetAngle);
    }else{
        r = 0;
    }

    while(stars.length){
        var star = stars.pop();

        var vel = {
            x: star.speed * Math.cos(star.angle * Math.PI / 180),
            y: star.speed * Math.sin(star.angle * Math.PI / 180)
        };

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + vel.x, star.y + vel.y);
        ctx.closePath();
        ctx.stroke();

        star.x += vel.x;
        star.y += vel.y;

        star.speed *= star.accel;

        star.accel += star.accel2;

        if(star.x < canvas.width && star.x > 0 && star.y < canvas.height && star.y > 0){
            bench.push(star);
        }
    }

    stars = bench.slice(0).reverse();
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop(){
    requestAnimFrame(animloop);
    render();
})();




if(ratio == 2){
	canvas.style.width='100%';
    canvas.style.height='100%';
}

var GUIControls = {
    holeSize: holeSize,
    rotationDistance: rotationDistance,
    rotationSpeed: rotationSpeed,
    spawnCount: spawnCount,
    rotationStep: rotationStep,
    randomize: randomize,
    reset: function() {
        holeSize = 100
        rotationDistance = 200
        rotationSpeed = 1
        spawnCount = 20
        rotationStep = 37
        randomize = true
    }
}

var datGUI = new dat.GUI()

datGUI.add(GUIControls, 'holeSize').min(0).max(1000).step(1).name('Hole Size').listen().onChange(function(val){ holeSize = val })
datGUI.add(GUIControls, 'rotationDistance').min(0).max(500).step(1).name('Rotation Distance').listen().onChange(function(val){ rotationDistance = val })
datGUI.add(GUIControls, 'rotationSpeed').min(0).max(5).name('Rotation Speed').listen().onChange(function(val){ rotationSpeed = val })
datGUI.add(GUIControls, 'rotationStep').min(-100).max(100).name('Rotation Step').listen().onChange(function(val){ rotationStep = val })
datGUI.add(GUIControls, 'spawnCount').min(1).max(100).name('Spawn Count').listen().onChange(function(val){ spawnCount = val })
datGUI.add(GUIControls, 'randomize', true, false).name('Randomize').onChange(function(val){ randomize = val })
datGUI.add(GUIControls, 'reset').name('Reset')

datGUI.domElement.querySelector('ul').classList.toggle('closed')