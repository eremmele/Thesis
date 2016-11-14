var vertexHeight = 15000;
var planeDefinition = 100;
var planeSize = 1245000;
var totalObjects = 100000;
var shipspeed = .1;
var cx = 0, cy = 0, cz = 0; 

var canvas = document.getElementById('c');
ctx = canvas.getContext('2d'),

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,1, 400000)
camera.position.z = 550000;
camera.position.y =10000;
camera.lookAt( new THREE.Vector3(0,6000,0) );


var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x000000, 1, 300000 );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 10000, camera.position.z +4000 );
scene.add( spotLight );

var	plane = new THREE.Mesh( new THREE.PlaneGeometry( planeSize, planeSize, planeDefinition, planeDefinition ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } ) );
plane.rotation.x -=Math.PI*.5;

scene.add( plane );


var ship;

var loader = new THREE.ObjectLoader();

ship = loader.parse(shipJSON);

  ship.scale.set(100,100,100);
  ship.position.z = camera.position.z -1000;
  ship.position.y = camera.position.y -100;
  ship.rotation.y =Math.PI;
  ship.rotation.x =.1;
  scene.add( ship );


var geometry = new THREE.Geometry();

for (i = 0; i < totalObjects; i ++) 
{ 
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*planeSize-(planeSize*.5);
  vertex.y = Math.random()*100000;
  vertex.z = Math.random()*planeSize-(planeSize*.5);
  geometry.vertices.push( vertex );
}

var material = new THREE.ParticleBasicMaterial( { size: 200 });
var particles = new THREE.ParticleSystem( geometry, material );
	 
scene.add( particles ); 

var renderer = new THREE.WebGLRenderer({ alpha: true  });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

updatePlane();

 function updatePlane() { 
   for (var i = 0; i < plane.geometry.vertices.length; i++) 
   { 
     plane.geometry.vertices[i].z += Math.random()*vertexHeight -vertexHeight; 
   } 
 };


  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var currentlyPressedKeys = {};

  function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
  }


  function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
    ship.rotation.z = 0;
    ship.rotation.x = 0;
  }

render();

			function render() {
        requestAnimationFrame( render );
        camera.position.z -= 150;
        ship.position.z -= 150;
        
        handleKeys();
        
        ship.position.x -= cx;;
        ship.position.y -= cy;;
 
        renderer.render( scene, camera );
			}



function handleKeys() {
    if (currentlyPressedKeys[65] || currentlyPressedKeys[37]) {   
      ship.rotation.z = -.5;
      cx += shipspeed;
    }

    if (currentlyPressedKeys[68] || currentlyPressedKeys[39]) {
      ship.rotation.z = .5;
      cx -= shipspeed;
    }
    if (currentlyPressedKeys[87] || currentlyPressedKeys[38]) {
   
      ship.rotation.x = .95;
      cy -= shipspeed;
    }
  
    if (currentlyPressedKeys[83]  || currentlyPressedKeys[40]) {
    
      ship.rotation.x = -.25;
      cy += shipspeed;
    }
  }
