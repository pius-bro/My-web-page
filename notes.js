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

// arrow functions = a concise way to write function expressions 
//                 good for simple functions

const numbers = [1,2,3,4,5,6];
const cubes = numbers.map((element) => Math.pow(element,2));
const Even = numbers.map((element) => element %2 === 0);

console.log(cubes,Even);

// objects --> A collection of related properties and/or method can
//            represent real world object (people,products,places)
//            object = {key:value, function()}

const person = {
    name: "pius",
    lname: "osiemo",
    age : 24,
    sayhello:function(){console.log(`hello mother fucker  ${this.person}`)},
}

console.log(person.mame);
person.sayhello();

// this = refrence to the object where This is used
//       person.name = this.name

// constructors in js = special methods for definig=ng the properties and methods of objects

function Car( make,model,year,color){
    this.make = make,
    this.model = model,
    this.year = year,
    this.corol = color
    this.drive = function(){console.log(`You drove ${this.model}`)} // methods
    
}
const car1 = new Car("Ford","Mustang",2024,"red");
console.log(car1);

// classes =blueprints of objects

class Product{
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
    displayProduct(){
        console.log(`Product:${this.name}`); // methods
        console.log(`Price:${this.price}`);
    }
    calculateTotal(salesTax){
        return this.price + (this,price * salesTax);
    }
}
const salesTax = 0.04;
const product = new Product("Shirt",90);
const product2 = new Product("Shir",90);
const product3 = new Product("Shirt",90);
product.displayProduct();
product2.displayProduct();

const total = product.calculateTotal(salesTax);
console.log(`Total price:${total.toFixed}`);

// static = keyword that defines methods  that belongs to a class instead of objects

class MathUtil{
    static PI = 3.14159;
    static getDiameter(radius){
        return radius *2
    }
    static getCircumFerence(radius){
        return this.PI *radius;
    }
}

console.log(MathUtil.PI);
console.log(MathUtil.getDiameter(10));
console.log(MathUtil.getCircumFerence(10));

// inheritence = allows a new class to inherit properties amd methods froman existing class

class Animal{
    alive= true;

    eat(){
        console.log(`This ${this.name} is eating`);
    }
    sleep(){
        console.log(`This ${this.name} is sleeping`);
    }
}
class Rabbit extends Animal{
    name = "rabbit";
}
class Fish extends Animal{
    name = "fish";
}
class Hawk extends Animal{
    name="Hawk";
}

const rabbit = new Rabbit();
const fish = new Fish();
const hawk = new Hawk();

console.log(hawk.alive); // accesing global variable
hawk.eat(); // inheritance
hawk.sleep(); // inheritance

// super keyword = enables the subclasses acces properties of a super class through a constructor

class Animal{
    constructor( name,age){
        this.name = "name";
        this.age = 'age';

    }
}
class Rabbit extends Animal{
    constructor(name,age,year){
        super(name,age);
        this.year='year';

    }
}
class Fish extends Animal{
    constructor(name,age,year){
        super(name,age);
        this.year=
        year;

    }
    
}
class Hawk extends Animal{
    constructor(name,age,year){
        super(name,age);
        this.year='year';

    }
    
}
const rabb = new Rabbit("nw", 24,"2025")
console.log(rabb);

// getters = special methods that makes a property readable
// setters = special methods that amkes a property writable


class Rectangle{
    constructor(width,height){
        this.width = width;
        this.heigh = height;
    }
    set width(newwidt){
        if(newwidt>0){
            this.width = newwidt;
        }
        else{
            console.error("width must be a post number");
        }
    }
    set height(height){
        if(newHeight>0){
            this.height = newHeight;
        }
        else{
            console.error("height must be a post number");
        }
    }
    get width(){
        return this._width;

    }
    get height(){
        return this._height;
    }
    get area(){
        return this._width * this._height;
    }
}
const rectangle = new Rectangle(3,4);

console.log(rectangle.width);
console.log(rectangle.height);
console.log(rectangle.area);


// destructing or unpacking

let a =1;
let b = 2;

[a,b] = [c,d];

// nested objects = objects inside of other objects.allows you to represents

const Worker ={  // can be made through OOP
    fname : "Pius",
    Lname: "Osiemo",
    isworker: true,
    hobbies : ["Moivie","football"],
    address :{
        street : "33 kiligoris",
        city: "Nairobi",
        country : "Kenya"
    }

}
console.log(Worker.fname); // you  do the same to others
console.log(Worker.address.city);

// array of objects
const fruits =[{ name:"pius",age:"24",course:"computer science"},
                {name:"osiemo",age:"24",course:"computer science"},
                {name:"Nim",age:"24",course:"computer science"},
                {name:"Obita",age:"24",course:"computer science"},
                {name:"Atley",age:"24",course:"computer science"}];

fruits.push(); // to add elements
fruits.pop(); // to pop elements from the object
fruits.slice(); // to slice
// forEach --> to loop throug
// map() --> 
const ftuitNma= fruits.map(fruit=>fruit.name) ;// helps to carry out thr looping
console.log(ftuitNma);

// filter method

const yellofruit = fruits.filter(fruit=> fruit.color ==="yellow");

// sort method --> used to elements in an array in order

let arr = [1,12,24,12,56,76];
arr.sort();
console.log(arr);















