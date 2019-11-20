const programInput = document.querySelector("textarea");
const goBtn = document.querySelector("#go");
const repeatChekbox = document.querySelector("#repeat");
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
    // ismétlések beállítása
    let n = repeatChekbox.checked ? nInput.value : 1;
    // program végrehajtása
    for(let i = 0; i < n; i++){
        
    }
}

goBtn.addEventListener("click", runProgram);

nInput.addEventListener("change", function(){
    repeatChekbox.checked = true;
})

/* egy vonal húzása
    ctx.clearRect(0,0,cw,ch);
    ctx.beginPath();
    ctx.moveTo(cw/2, ch/2);
    let {x,y} = polarToXY(cw/2,ch/2, 100, 75);
    console.log(x,y);
    ctx.lineTo(x,y);
    ctx.stroke()
*/


