const display = document.getElementById("display");

// --- Standard Display Functions ---
function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function calculate(){
    try{
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

// --- Scientific Functions ---
let mode = "DEG"; // Degree or Radian
function toggleMode(){
    mode = mode === "DEG" ? "RAD" : "DEG";
    document.getElementById("mode-btn").innerText = mode;
}

function sin(){
    const val = parseFloat(display.value);
    display.value = mode==="DEG" ? Math.sin(val * Math.PI/180) : Math.sin(val);
}

function cos(){
    const val = parseFloat(display.value);
    display.value = mode==="DEG" ? Math.cos(val * Math.PI/180) : Math.cos(val);
}

function tan(){
    const val = parseFloat(display.value);
    display.value = mode==="DEG" ? Math.tan(val * Math.PI/180) : Math.tan(val);
}

function sqrt(){ display.value = Math.sqrt(display.value); }
function square(){ display.value = display.value**2; }
function power(){ appendToDisplay("**"); }
function log(){ display.value = Math.log10(display.value); }
function ln(){ display.value = Math.log(display.value); }

// Factorial Function
function factorial(){
    let n = parseInt(display.value);
    if(n < 0) { display.value = "Error"; return; }
    let fact = 1;
    for(let i=1;i<=n;i++) fact *= i;
    display.value = fact;
}

// Pi Button
function pi(){ appendToDisplay(Math.PI); }

// --- Memory Functions ---
let memory = 0;
function memoryAdd(){ memory += Number(display.value); }
function memorySubtract(){ memory -= Number(display.value); }
function memoryRecall(){ display.value = memory; }
function memoryClear(){ memory = 0; }

// --- Extra Placeholders ---
function statisticsMode(){
    alert("Statistics Mode (placeholder)"); 
    
}

function matrixMode(){
    alert("Matrix Mode (placeholder)");
}