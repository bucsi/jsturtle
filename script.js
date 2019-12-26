const programInput = document.querySelector("textarea");
const goBtn = document.querySelector("#go");
const repeatChekbox = document.querySelector("#repeat");
const clearBtn = document.querySelector("#clear");
const nInput = document.querySelector("#n");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width;
const ch = canvas.height;

const szinek = {
    "fekete": "black",
    "vörös": "red",
    "narancs": "orange",
    "sárga": "yellow",
    "zöld": "green",
    "kék": "blue",
    "lila": "purple",
    "fehér": "white",
    "1": "black",
    "2": "red",
    "3": "orange",
    "4": "yellow",
    "5": "green",
    "6": "blue",
    "7": "purple",
    "8": "white",
}

let turtle = {
    x: undefined,
    y: undefined,
    dir: undefined,
    color: "black"
}

function init(){
    turtle.x = cw/2;
    turtle.y = ch/2;
    turtle.dir = 0;
    ctx.beginPath();
    ctx.clearRect(0,0,cw,ch);
    ctx.moveTo(turtle.x, turtle.y);
}

function polarToXY(currentX, currentY, step, direction){
    let x = currentX + step*Math.cos(direction*Math.PI/180);
    let y = currentY - step*Math.sin(direction*Math.PI/180);
    return({x,y});
}

function colorToColor(col){
    newColor = szinek[col];
    if(newColor == null){
        alert('Nincs "' + col + '" szín, alapértelmezett feketével folytatom...')
        newColor = "black";
    }
    return newColor;
}

function runProgram(){
    let program = programInput.value.replace(/; /g, ";").split(";")
    for(let i = 0; i < program.length; i++){
        program[i] = program[i].split(" ")
    }
    // ismétlések beállítása
    let repeats = Number(nInput.value);
    // program végrehajtása
    for(let i = 0; i < repeats; i++){
        for(let p of program){
            let command = p[0];
            let parameter = p[1];
            if(command === "e"){
                let calc = polarToXY(turtle.x,turtle.y, Number(parameter), turtle.dir);
                ctx.beginPath();
                ctx.moveTo(turtle.x, turtle.y);
                turtle.x = calc.x;
                turtle.y = calc.y;
                ctx.lineTo(turtle.x,turtle.y);
                ctx.strokeStyle = turtle.color;
                ctx.stroke();
            }else if(command === "j"){
                turtle.dir -= Number(parameter);
            }else if(command === "b"){
                turtle.dir += Number(parameter);
            }else if(command === "tsz"){
                turtle.color = colorToColor(parameter);
            }else{
                alert("ismeretlen utasítás (" + command + " " + parameter + ") kihagyva")
            }
        }
    }
}

goBtn.addEventListener("click", runProgram);
clearBtn.addEventListener("click", init);
nInput.addEventListener("input", function(){
    if (!Number(nInput.value) > 1){
        nInput.value = 1;
    }
})

init()