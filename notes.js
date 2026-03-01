//console.log('Hello');
//console.log('I like pizzza');
//window.alert(`This is an alert`)
//window.alert(`i like pizza`)
//----> comments in js

/* document.getElementById("myH1").textContent='Hello';
document.getElementById("myp").textContent='I like pizza';
*/

// variables

/* let x;
x = 100;
console.log(x);
*/
/*
let age = 25;
let price = 10.99;
console.log(age,price);
*/

// let age = 25;
// console.log('You are ${age} years old');
// console.log(typeof age)
// let name ="pius";---> String

// let online = true; --> boolean
// let forsale = true;

// arithmetic operation ---> operands(*,-,=,/)

// let students = 30;
//students = students + 1
//console.log(students)

// let students = 30;
// students = students % 3
// console.log(students)
// increment--> students++; e.t.c
// students += 1; --> assignment

// user input in js

// let username;
// username=window.prompt("Enter your username:")
// console.log(username)

// let username
// document.getElementById("mySubmit").onclick=function(){

 //   username = document.getElementById("myText").ariaValueMax;
 //   console.log(username);
// }

// type casting

// let age = window.prompt("How old are you?");
// age = Number(age);---> typecasting
// age+=1;
// console.log(age);

// constants or const --> cannot be changed

//const pi = 3.1459; // unchageable on the way
//let radius;
//let circumfrence;
// pi = 49; can't work
//radius = window.prompt("Enter the radius");
//radius = Number(radius);
//circumfrence = 2*pi*radius;
//console.log(circumfrence);

/* const PI = 3.1459;
let radius;
let circumfrence;
document.getElementById("submit").onclick=function(){
    document.getElementById("radius").ariaValueMax;
    radius = Number(radius);
    circumfrence = 2*pi*radius;
    document.getElementById("myH2").textContent=circumfrence
}
*/
//math func--> bult in properties and methods

/* let x = -3.21;
let y = 2;
let z;

z =  Math.round(x);
z =  Math.floor(x);
z =  Math.tan(x);
z =  Math.pow(x,y);
z =  Math.sqrt(x);
z =  Math.log(x);
z =  Math.abs(x)
z =  Math.sin(x)

console.log(z);
*/

// RANDOM NUMBER IN JS

/* const min = 50;
const max = 100;
let randonum = Math.random();
let random = Math.floor(Math.random());
console.log(randomnum);
*/

/* const button = document.getElementById("button");
const label = document.getElementById("label");
const min = 1;
const max = 6;
let randomnum;

button.onlick=function(){
    randomnum = Math.floor(Math.random ()*max) + min;
    label.textContent = randomnum;

}
 */

// IF statements --> expressions that evaluated as true or false

/* let age = 12;
if(age >= 20){
    console.log("False");
}
else{
    console.log("True");
}
*/

// CHECKBOX in JS --->distributes the checked state of an HTML

/* const checkbox =document.getElementById("checkbox");
const subscribeBtn= document.getElementById("subscribeBtn");
const visa =document.getElementById("visa");
const paybal =document.getElementById("paybal");
const submit =document.getElementById("submit");
const subResult =document.getElementById("subResult");
const paymentresult =document.getElementById("paymentresult");

subscribeBtn.onclick=function(){
    if(checkbox.checked){
        subResult.textContent="You're subscribed";
    }
    else{
        subResult.textContent="You're not subscribed";
    }
    if(visa.checked){
        paymentResult.textContent ="You are paying with visa";
    }
    else if(mastercard.checked){
    paymentResult.textContent ="You are paying with mastercard";
    }
    else if(paybal.checked){
        paymentResult.textContent ="your're selecting payment method";
    }
}
*/

// ternary operator--> shortcut to if and else statements helps to assign a variable based on a condition
// condition ? codeIfTrue : codeIfFalse;

/*
let time = 16;
let greeting  = time < 12 ? "morning": "afternoon";
console.log(greeting);
*/
// switch statements in Js --> replacement of man if stastements

/* let day = 1;
switch(day){
    case 1:
    console.log("its monday");
       break;
     case 2:
    console.log("its tuesday");
       break;
     case 3:
    console.log("its wenesaday");
      break;
     case 4:
    console.log("its thursday");
      break;
     case 5:
    console.log("its friday");
     break;
     case 6:
    console.log("its saturday");
      break;
     case 7:
    console.log("its sunday");
      break;
    default:
        console.log(`$(day)is not a day`)

}
*/
// String method --> allows to manipulate and work with (strings)
/*
let username = "Brocode";
console.log(username.charAt(0))
console.log(username.length);
console.log(username.toUpperCase());
console.log(username.toLocaleLowerCase());
*/

// method chaining--> calling one method after the other
/* let username = prompt("Enter your username");
 username.trim().charAt(0).toLocaleLowerCase().toLocaleUpperCase();
*/

// while loops--> repeat some code while some condition is true

/* let username = "";
while(username==="" || username===null){
    console.log("You did not enter the user name");
}
console.log(`Hello ${username}`);
*/

/* let loggedIn = false;
let username;
let password;

while(!loggedIn){
    username = window.prompt("Enter the username:");
    password = window.prompt("Enter your password:");

    if(username==="-46#@gsy" && password == "!3456"){
        loggedIn = true;
        console.log("You are logged in!");
    }
    else{
        console.log("Invalid credentials");
    }
}
    */

// for loop --> repeats some code a limited amount of times

/* for(let i =0; i<=2;i++){
    console.log(i);
}
*/

// break keyword --> exits the loop completely

// Number guesssing game

/* const minimum = 1;
const maxmum = 100;
const answer = Math.random() * (maximum - minimum + 1);
console.log(answer);
*/
/*
const minimum = 1;
const maximum = 100;
const answer = 67;
//const answer = Math.random() * (maximum - minimum + 1);


let attempts = 0;
let guess;
let running = true;
while(running){
    guess = window.prompt(`Guess a number between ${minimum} - ${maximum}:`);
    guess = Number(guess);

    if(isNaN(guess)){
        window.alert("Please enter a valid number");
    }
    else if(guess<minimum || guess> maximum){
        window.alert("Please enter a valid number");

    }
    else{
        if(guess < answer){
            window.alert("Too low");
        }
        else if(guess > answer){
            window.alert("Too high");
        }
        else if(guess===answer){
            window.alert(`CORRECT! your answer is ${answer} and you have ${attempts}`)
        }
        else{
            window.alert(`CORRECT! ${answer} it too you ${attempts}`);
        }
    }
    attempts++;
    console.log(attempts);
    running = false
}
*/
//functions --> a code designed for a specific func;
/*
function birthday(name,age){
    console.log("Happy birthday")
}
birthday("pius",24);
birthday("Atley",24);

// Data structures in Javascript
// Array --> A variable like structuree thatcan hold more than 1 value

let fruits =["apple","Orange",'banana']; // lists in python
console.log(fruits[0]);// accessing elements in a array

let numOffruits = fruits.length; // finding the number of elements in a an array
let index = fruits.indexOf("banana") // accessig the index of each element

fruits.sort().reverse;

for(let fruit of fruits){
    console.log(fruit);
}

// spread operator = ... allows an iterable such as unpacking

let array = [3,5,6];
console.log(...array); // unpacking 

let vegetables = ["kales","carrot"];
let food = [...vegetables]; // creating new lists or copying


/ callback = a fuction that is passed as an argument to another function

hello(calculate);
function calculate(x,y){
    console.lopg(x*y);
calculate(6,7);
}

// forEach = method used to iterate over an array of elements and apply callback

let numbers =[4,2,3,7,8];
numbers.forEach(display);// applie the function to each element

function display(element){
    console.log(element*3)
}

// .map() = accepts a callback and applies that function to each element of an array and return a nemw array

const arr =[4,2,3,7,8];
const squares= arr.map(square);// applie the function to each element
console.log(squares);
function square(eleme){
    return Math.pow(eleme,2);
}
 
//. filter() = creates a new array  by filterinh out elements

let numbers =[2,3,4,5,6,7,8,9,10];
const even = numbers.filter(Even);
const odd = numbers.filter(Odd);

function Even(element){
    return element % 2 ===0;
}
function Odd(element){
    return element % 2 !=0;
}

*/







