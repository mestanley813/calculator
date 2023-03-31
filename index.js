//Initialize variables for all of the buttons and "screen" on the calculator
const numbers = document.querySelectorAll(".numbers");
const result = document.querySelector(".result span");
const symbols = document.querySelectorAll('.symbol');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear'); 
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');

//Initialize the first and second values input by the user, followed by the symbol and result value 
let firstValue = "",
    isFirstValue = false,
    secondValue = "",
    isSecondValue = false,
    symbol = "",
    isDecimal = false,
    resultValue = 0;

//Add event listeners to the number buttons and determine if the button pressed is the first value or second
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let value = e.target.getAttribute('value');
        if (isFirstValue === false) {
            getFirstValue(value);
        }
        if (isSecondValue === false){
            getSecondValue(value);
        }
    })
}

function getFirstValue(firstNumber) {
    result.innerHTML = "";
    firstValue += firstNumber;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

function getSecondValue(secondNumber){
    if(firstValue != "" && symbol != ""){
        secondValue += secondNumber;
        result.innerHTML = secondValue;
        secondValue = +secondValue
    }
}

function getSymbol(){
    for (let i = 0; i < symbols.length; i++){
        symbols[i].addEventListener('click', (e) => {
            symbol = e.target.getAttribute('value');
            isFirstValue = true;
        })
    }
}
getSymbol();

//Add event listener to the math symbols and compute the mathematical expression.
equals.addEventListener('click', () => {
    result.innerHTML = "";
    if (symbol === "+") {
        resultValue = firstValue + secondValue;
    } else if (symbol === "-") {
        resultValue = firstValue - secondValue;
    } else if (symbol === "x") {
        resultValue = firstValue * secondValue;
    } else if (symbol === "/") {
        resultValue = firstValue / secondValue;
    }
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();

})

//Truncate the result if longer than 7 characters
function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if(resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

//Add event listener to the negative button and convert the current value to negative.
negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }

    if (firstValue != "" && secondValue != "" && symbol != "") {
        resultValue = -resultValue;
    }

    result.innerHTML = resultValue;
});

//Add event listener to the percent button and convert the current value to a decimal.
percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }

    if (firstValue != "" && secondValue != "" && symbol != "") {
        resultValue = resultValue / 100;
    }

    result.innerHTML = resultValue;
});

//Clear all values and revert them to their defaults
clear .addEventListener('click', () => {
    result.innerHTML = 0;
    
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    symbol = "";
    resultValue = 0;
    isDecimal = false;
});
