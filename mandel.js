//A small Mandelbrot implementation
//Z(n+1) = Zn^2 + C
//Any point C that does not diverge under that function
//is contained within the Mandelbrot set.
//Invented by Benoit Mandelbrot

//Setup the canvas to draw upon
const width = 720;
const height = 720;
const canvas = document.createElement("canvas");
const scr = canvas.getContext("2d");

let offset = Math.floor((window.innerHeight - height) /2);
canvas.id = "space";
canvas.style.top = offset + "px";
canvas.style.position = "relative";
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

scr.fillStyle = "black";
scr.fillRect(0,0,width, height);

//Map X, Y between 0 and W/H to Complex axis
function scale(n, min, max, axis){
    return n * (max - min) / axis + min;
}

// Define Complex Plane
let minI = -.3;
let maxI = 0.2;
let minR = -1.9;
let maxR = -1.4;

//Set escape conditions
let maxIteration = 150;
let bailRadius = 4;

//All pixels
for(let x = 0; x < width; x++){ //Columns
    for(let y = 0; y < height; y++){ //Rows
        //Define C = [x,yi]
        let ci = scale(y, minI, maxI, height);
        let cr = scale(x, minR, maxR, width);
        //Define Z = [0, 0i]
        let zi = 0;
        let zr = 0;
        let i = 0;
        //Iterate the function
        while(i < maxIteration){
            let zit = zi;
            //The mandelbrot function
            zi = 2 * Math.abs(zr * zi) + ci;
            zr = zr * zr - zit * zit + cr;
            //Pythagoras
            let dist = zr * zr + zi * zi;
            if(dist >= bailRadius){
                break; //C ya!
            }
            i++;
        }
        //Check if point escaped
        if(i < maxIteration){
            //transparency by number of iterations / maxIterations
            let alpha = i / maxIteration * 5;
            //Draw color
            scr.fillStyle = "rgba(0, 220, 255, "+alpha.toFixed(2)+")";
            scr.fillRect(x,y,1,1);
        }
    }
}