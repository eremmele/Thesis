/* 3D tunnel by Mihail Tornberg
 * http://mihailtornberg.com
 */
canvas = document.getElementById('c');
ctx = canvas.getContext('2d');
ctx.font="40px arial";

function rez() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cwh = canvas.width/2;
  chh = canvas.height/2;
  wh = window.innerWidth;
}
window.onresize = rez;
rez();

circles = [];
circlesArray = [];

c = 1;
s = 1;

for(var i = -100; i < wh; i+=30) {
	circles.push(i);
}
for(i=0;i<circles.length;i++) {
	circlesArray.push([]);
}


var Tunnel = function() {
	ctx.clearRect(0,0, canvas.width, canvas.height)

	
	for(var i = 0; i < circles.length; i++) {
		circles[i] = circles[i]+1;
		if(circles[i]>wh)circles[i]=-100;
	}

	c += Math.random()*0.01;

	circles.sort(function(a,b) {
		return a - b;
	});

	for(var z = 0; z < circles.length; z++) {
	
		for(var i = 0; i < 30; i++) {
		circleVal = circles[z];
		if(circleVal<0)circleVal=0;
 		x = Math.cos(2 * Math.PI * (i) / 30) * circleVal + cwh + 150*Math.cos(Math.sin(c*0.8)*((circles[z])*0.018));
 		y = Math.sin(2 * Math.PI * (i) / 30) * circleVal + chh + 150*Math.sin(Math.cos(c*1.1)*((circles[z])*0.015)) - (circles.length - z)*2;

 		circlesArray[z][i] = {x:x,y:y}
		}
	}

	for(z = 1; z < circles.length; z++) {
		for(i = 0; i < 30; i+=1) {
			val = Math.round((cwh*1.5-circlesArray[z][i].x)/4);
			//ctx.fillStyle="rgba("+val+",0,"+val+",1)";
			ctx.beginPath();
			if(i<29) {
			ctx.moveTo(circlesArray[z-1][i].x,circlesArray[z-1][i].y);
			ctx.lineTo(circlesArray[z-1][i+1].x,circlesArray[z-1][i+1].y);
			ctx.lineTo(circlesArray[z][i+1].x,circlesArray[z][i+1].y);
			ctx.lineTo(circlesArray[z][i].x,circlesArray[z][i].y);
		} else {
			ctx.moveTo(circlesArray[z-1][0].x,circlesArray[z-1][0].y);
			ctx.lineTo(circlesArray[z-1][29].x,circlesArray[z-1][29].y);
			ctx.lineTo(circlesArray[z][29].x,circlesArray[z][29].y);
			ctx.lineTo(circlesArray[z][0].x,circlesArray[z][0].y);			
		}
			ctx.fill();
			ctx.closePath();
		}
	}
}

var loop = function() {
	Tunnel();
	requestAnimationFrame(loop);
}
loop();