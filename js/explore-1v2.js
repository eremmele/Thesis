
    var stars = []
    var w = 600;
    var h = 600;
    var w2 = w/2, h2=h/2;
    var depth = 10000;
    
    var canvas = document.getElementById('canvas');
    canvas.width=w;
    canvas.height=h;
    
    var c2d = canvas.getContext('2d');
    c2d.fillRect(0,0,w,h);
    
    var stop=true;
    var loop;
    var speed = 0.25;
    
    var globalAngle = 0.0;
    var deltaAngle = Math.PI/500;
    
    var updating, delta, updated;
    
    var mousex, mousey;
    
    $("#canvas").click(
        function(e){ 
            e.preventDefault();
            stop=!stop;
            clearInterval(loop);
            updated = new Date().getTime();
            loop = setInterval("animation()", stop?250:15);
        }
    );
    
    $("#canvas").mousemove(
        function(e){
            mousex = e.pageX - this.offsetLeft; 
            mousey = e.pageY - this.offsetTop;
            if (mousey==0) mousey==0.0001;
        });
    
    function bigBang()
    {
        for(i=0; i<2000; i++)
        {
            addStar(150*(Math.random()*w-w2), 150*(Math.random()*h-h2), Math.random()*depth);
        }
    }
    
    var bytes=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    function randByte()
    {
        return bytes[Math.floor(Math.random()*16)]+bytes[Math.floor(Math.random()*16)];
    }
    
    function randRgb()
    {
        return '#'+randByte() + randByte() + randByte();
    }
    
    function addStar(x,y,z)
    {
        stars[stars.length]={"x":x, "y":y, "z":z, "c": randRgb()};
    }
     
    function rotate(angle)
    {
        c2d.translate(w2,h2);
        c2d.rotate(-angle);
        c2d.translate(-w2,-h2);
    }
    
    function redraw() {
        if($.browser.webkit || $.browser.msie) {
            rotate(-globalAngle);    
            c2d.fillStyle='#000';
            c2d.fillRect(0,0,w,h);
            
            globalAngle = Math.atan(mousex/mousey)+deltaAngle;
                    
            deltaAngle+=0.01;
            rotate(globalAngle); 
        } else {
            c2d.fillStyle='#000';
            c2d.fillRect(0,0,w,h);
        }
        for(var i=0; i<stars.length; i++) {
            s = stars[i];
            c2d.fillStyle= s.c;
            k=s.z<1000?2:1;
            c2d.fillRect(w2+(s.x)/s.z,h2+(s.y)/s.z,k,k);
        }
        
        updated = new Date().getTime();
    }
    
    function main()
    {
        bigBang();
        redraw();
    }
    
    function move()
    {
        delta = (updating=new Date().getTime())-updated;
        for(i=0; i<stars.length; i++) {
            s = stars[i];
            s.z-=speed*delta;
            if (s.z<0) s.z=depth;
        }
        
        updated=updating;
    }
    
    function animation()
    {
        if (stop) return;
        move();
        redraw();
    }
    
    main();