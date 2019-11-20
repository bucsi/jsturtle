//========================================================== Változók
const programInput = document.querySelector("textarea");
const goBtn = document.querySelector("#go");
const repeatChekbox = document.querySelector("#repeat");
const clearChekbox = document.querySelector("#clear");
const nInput = document.querySelector("#n");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width;
const ch = canvas.height;

let turtle = {
    x: undefined,
    y: undefined,
    dir: undefined
}

//========================================================== Függvények

function init(){
    turtle.x = cw/2;
    turtle.y = ch/2;
    turtle.dir = 0;
    ctx.beginPath();
    ctx.clearRect(0,0,cw,ch);
    //ctx.strokeStyle = "black";
    ctx.moveTo(turtle.x, turtle.y);
    ctx.closePath();
}

function polarToXY(currentX, currentY, step, direction){
    let x = currentX + step*Math.cos(direction*Math.PI/180);
    let y = currentY - step*Math.sin(direction*Math.PI/180);
    return({x,y});
} 

function runProgram(){

    // bemenet feldokgozása és lépésekre bontása
    let program = programInput.value.replace(/; /g, ";").split(";")
    console.log(program)
    for(let i = 0; i < program.length; i++){
        program[i] = program[i].split(" ")
    }
    console.log(program)
    // ismétlések beállítása
    let n = repeatChekbox.checked ? nInput.value : 1;
    if(clearChekbox.checked){
        init();
    }
    // program végrehajtása
    for(let i = 0; i < n; i++){
        for(let p of program){
            console.log(p)
            let command = p[0];
            let parameter = Number(p[1]);
            if(command === "e"){
                let calc = polarToXY(turtle.x,turtle.y, parameter, turtle.dir);
                console.log(calc)
                turtle.x = calc.x;
                turtle.y = calc.y;
                ctx.lineTo(turtle.x,turtle.y);
            }else if(command === "j"){
                turtle.dir -= parameter;
            }else if(command === "b"){
                turtle.dir += parameter;
            }else if(command === "tsz"){
                console.log("not implemented")
            }else{
                console.log("ERR\tNincs ilyen parancs (" + command + " " + parameter + ")")
            }
            console.log(turtle)
        }
    }
    ctx.stroke();
}

//========================================================== EventListenerek 

goBtn.addEventListener("click", runProgram);

nInput.addEventListener("change", function(){
    repeatChekbox.checked = true;
})

//========================================================== "main"

init()


