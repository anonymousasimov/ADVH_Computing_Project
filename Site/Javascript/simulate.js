//Simulates data found in CurrentSystem

//defines body class
class Body {
    constructor(name,mass,posx,posy,vx,vy,color,oldpos,trail){
        this.name = name;
        this.mass = mass;
        this.posx = posx;
        this.posy = posy;
        this.vx = vx;    
        this.vy = vy;
        this.color = color;
        this.oldpos = oldpos;
        this.trail = trail;
    }
}

//Loads CurrentSystem and returns array of records
function load_current(){
    //scale
    const scale = 175/149597870660;
    //offset to be centred
    const offset = document.getElementById("canvas").width / 2 / scale;
    //Array of records
    const bodies = [];
    //mass scale
    const ms = 10 ** 24;
    //position scale
    const ps = 10 **9;
    //km scale
    const km = 10**3;
    
    //string of all file data
    filedata = document.getElementById("CurrentSystem").innerHTML;
    var lines = filedata.split("\n");
    for (let line of lines){
        var item = line.split(",");
        //position x (m)
        let x = Number(item[2] * ps + offset);
        //position y (m)
        let y = Number(item[3] * ps + offset);
        //last postion - pairs of x and y (number of pairs(5) = trail length)
        const oldpos = [0,0,0,0,0,0,0,0,0,0,0,0];
        //item[0] is name item[1] is mass item[2] is posx
        //item[3] is posy item[4] is vx item[5] is vy
        //item[6] is color item[7] is trail
        //reads data from file into bodies array
        var object = new Body(item[0],Number(item[1] * ms),x,y,Number(item[4]),Number(item[5] * km),item[6],oldpos,item[7]);
        bodies.push(object);
    }
    return bodies;
}

//Computes gravitational force - returns vectors fx and fy
function get_attraction(self,other){
    //Gravitational constant
    const G =6.67 *10 ** -11;
    //distance on x-axis
    var dx = other.posx - self.posx;
    //distance on y-axis
    var dy = other.posy - self.posy;
    //distance
    var dist = Math.sqrt(dx **2 + dy **2);
    //Gravitaional force
    var F = G * self.mass * other.mass / (dist ** 2);
    //Computes Vector forces in terms of x and y
    var Theta = Math.atan2(dy,dx);
    var fx = F * Math.cos(Theta);
    var fy = F * Math.sin(Theta);
    return [fx,fy];    
}

//simulates bodies - does not return
async function simulate(bodies){
    //Checks status
    var status = document.getElementById("status").innerHTML = "running";
    //timescale  (1/2 day)
    const t = 60 * 60 * 12;
    //scale - 175px = 1AU
    const scale = 175/149597870660;
    //setup canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //Simulates bodies whilist 
    while (status == "running"){
        for (let current of bodies){
            //total force along x axis
            var totalfx = 0;
            //total force along y axis
            var totalfy = 0;
            for (let other of bodies){
                //ensures attraction to self is not calculated
                if (current.name == other.name){
                    continue;
                }
                //Computes total force
                const force = get_attraction(current,other);
                totalfx += force[0];
                totalfy += force[1];
            }
            //calculates current velocity
            current.vx += totalfx / current.mass * t;
            current.vy += totalfy / current.mass * t;
            //calculates position
            current.posx += current.vx * t;
            current.posy += current.vy * t;
            //new positon x in px
            var x = current.posx * scale;
            //new positon y in px
            var y = current.posy * scale;
            //Marks position of body on canvas
            ctx.fillStyle = current.color;
            dot(x, y, 3, ctx);
            //if trails enabled then draws over old position 
            if (current.trail == "true"){
                ctx.fillStyle = "black";
                dot(current.oldpos[0], current.oldpos[1], 4, ctx);
                current.oldpos.push(x, y);
                current.oldpos.splice(0,2);
            }
            //checks to see if status has changed
            status = document.getElementById("status").innerHTML
            //sleeps function to allow for objects to be drawn
            await sleep(1);
        }
    }
    //Clears canvas
    ctx.clearRect(0,0,document.getElementById("canvas").width,document.getElementById("canvas").height);
}

//draws a dot
function dot(x, y, r, canvas){
    canvas.beginPath();
    canvas.arc(x, y, r, 0, 2 * Math.PI,true);
    canvas.stroke();
    canvas.fill();
}   

//sleeps code
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

//main program   
function simulate_main(){
    display("run", "none");
    display("reset", "block");
    var bodies = load_current();
    simulate(bodies);
}