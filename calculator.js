// Number buttons
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', displayNumber)
})

// Decimal button
document.querySelector('#decimal').addEventListener('click', displayDecimal)

// CE button
document.querySelector('#ce').addEventListener('click', clear)

// Operator buttons
document.querySelectorAll('.operators').forEach(item => {
    item.addEventListener('click', operate)
}) 

// Equals button
document.querySelector('#equals').addEventListener('click', calculate)

// Memory buttons
document.querySelectorAll('.memoryButton').forEach(item => {
    item.addEventListener('click', memoryAction)
})




var redisplay = false;

function displayNumber(e) {
    
    let display = document.querySelector('p')

    if (display.innerHTML.length > 10) {
        return;
    }

    if (display.innerHTML == 0 || redisplay === true) {
        display.innerHTML = e.target.innerHTML;
        redisplay = false;
    } else {
        display.innerHTML = `${display.innerHTML}${e.target.innerHTML}`
    }

}


function displayDecimal() {
    let display = document.querySelector('p')

    let decimal = document.querySelector('#decimal')
    

    for (let i = 0; i < display.innerHTML.length; i++) {
        if (display.innerHTML[i] === '.') {
            return;
        }
    }

    display.innerHTML = `${display.innerHTML}${decimal.innerHTML}`
}


function clear() {
    document.querySelector('p').innerHTML = 0;
    document.querySelector('#firstOperand').innerHTML = ""
    document.querySelector('#operator').innerHTML = ""
    document.querySelector('#secondOperand').innerHTML = ""
}


function operate(e) {
    
    if (document.querySelector('#firstOperand').innerHTML != "") {
        calculate();
    }

    let display = document.querySelector('p');
    let firstOperand = display.innerHTML;
    let operator = e.target.innerHTML;
    document.querySelector('#firstOperand').innerHTML = firstOperand;
    document.querySelector('#operator').innerHTML = operator;
    document.querySelector('#secondOperand').innerHTML = "";

    redisplay = true;

}

function calculate() {

    let display = document.querySelector('p');

    if (document.querySelector('#firstOperand').innerHTML == "") {
        return;
    }

    if (document.querySelector('#secondOperand').innerHTML != "") {
        var firstOperand = parseFloat(display.innerHTML);
        document.querySelector('#firstOperand').innerHTML = firstOperand;
        var secondOperand = parseFloat(document.querySelector('#secondOperand').innerHTML);
        var operator = document.querySelector('#operator').innerHTML;
    } else {
        var firstOperand = parseFloat(document.querySelector('#firstOperand').innerHTML);
        var secondOperand = parseFloat(display.innerHTML);
        var operator = document.querySelector('#operator').innerHTML;
        document.querySelector('#secondOperand').innerHTML = secondOperand;
    }

    let result = (operator == "+" ) ? firstOperand + secondOperand :
    (operator == "-") ? firstOperand - secondOperand :
    (operator == "x") ? firstOperand * secondOperand :
    firstOperand / secondOperand;

    
    display.innerHTML = result;
    
    redisplay = true;

}

function memoryAction(e) {
    return (e.target.innerHTML == "M+") ? memoryPlus() :
    (e.target.innerHTML == "M-") ? memoryMinus() :
    (e.target.innerHTML == "MR") ? memoryRecall() :
    memoryClear();
}

function memoryPlus() {

    let memory = document.querySelector('#memory').innerHTML;

    let newMemory = (memory == "No Memory") ? document.querySelector('p').innerHTML :
    parseFloat(memory) + parseFloat(document.querySelector('p').innerHTML);

    document.querySelector('#memory').innerHTML = newMemory;

}

function memoryMinus() {

    let memory = document.querySelector('#memory').innerHTML;

    let newMemory = (memory == "No Memory") ? 0 - parseFloat(document.querySelector('p').innerHTML) :
    parseFloat(memory) - parseFloat(document.querySelector('p').innerHTML);

    document.querySelector('#memory').innerHTML = newMemory;
}

function memoryRecall() {
    
    let memory = document.querySelector('#memory').innerHTML;
    if (memory == "No Memory") {
        return;
    } else {
        document.querySelector('p').innerHTML = memory;
    }
}

function memoryClear() {
    document.querySelector('#memory').innerHTML = "No Memory";
}