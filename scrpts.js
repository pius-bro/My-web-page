// Username input
const mySubmit = document.getElementById("mySubmit");
const myText = document.getElementById("myText");
const myH1 = document.getElementById("myH1");
const myP = document.getElementById("myP");

mySubmit.onclick = function(){
    let username = myText.value;
    myH1.textContent = "Hello " + username;
    myP.textContent = "Welcome to the website";
}

// Circle radius calculation
const submit = document.getElementById("submit");
const radiusInput = document.getElementById("radius");
const myH2 = document.getElementById("myH2");

submit.onclick = function(){
    let radius = Number(radiusInput.value);
    let area = Math.PI * radius * radius;
    myH2.textContent = "Area = " + area.toFixed(2);
}

// Dice roll
const rollBtn = document.getElementById("button");
const label = document.getElementById("label");

rollBtn.onclick = function(){
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    label.textContent = "Dice: " + randomNumber;
}

// Subscription and payment
const checkbox = document.getElementById("checkbox");
const visa = document.getElementById("visa");
const mastercard = document.getElementById("mastercard");
const paypal = document.getElementById("paypal");

const subscribeBtn = document.getElementById("subscribeBtn");

const subResult = document.getElementById("subResult");
const paymentResult = document.getElementById("paymentResult");

subscribeBtn.onclick = function(){

    if(checkbox.checked){
        subResult.textContent = "You are subscribed";
    }
    else{
        subResult.textContent = "You are NOT subscribed";
    }

    if(visa.checked){
        paymentResult.textContent = "Payment method: Visa";
    }
    else if(mastercard.checked){
        paymentResult.textContent = "Payment method: Mastercard";
    }
    else if(paypal.checked){
        paymentResult.textContent = "Payment method: PayPal";
    }
    else{
        paymentResult.textContent = "No payment method selected";
    }

}

