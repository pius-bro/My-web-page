const textBox = document.getElementById("textBox");
const toFahreheit =document.getElementById("toFahrenheit");
const toCelcius =document.getElementById("toCelsius");
const result = document.getElementById("result");
let temp;

function convert(){

    if(toFahreheit.checked){
        temp =Number(textBox.value);
        temp = temp * 9 / 5 + 32;
        result.textContent= temp .toFixed(1)+ "F";
        //result.textContent="You selected to Fhreheit";
    }
    else if(toCelcius.checked){
        temp =Number(textBox.value);
        temp = (temp-32) *(9/5);
        result.textContent= temp .toFixed(1)+ "Celcius";
       // result.textContent="You selected to Celcius";
    }
    else{
        result.textContent="Select a unit";
    }
    

}