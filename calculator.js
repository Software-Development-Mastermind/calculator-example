let firstOperand = null;
let secondOperand = null;
let operator = null;

let memory = null;

// Number buttons
document.querySelectorAll(".number").forEach((item) => {
    item.addEventListener("click", numberPress);
});

// CE button
document.querySelector("#ce").addEventListener("click", clear);

// Operator buttons
document.querySelectorAll(".operators").forEach((item) => {
    item.addEventListener("click", operate);
});

// Equals button
document.querySelector("#equals").addEventListener("click", (e) => {
    const result = calculate(firstOperand, secondOperand, operator);
    updateDisplay(result);
    firstOperand = null;
    secondOperand = null;
    operator = null;
});

// Memory buttons
document.querySelectorAll(".memoryButton").forEach((item) => {
    item.addEventListener("click", memoryAction);
});

function updateDisplay(value) {
    let display = document.querySelector("p");
    if (display.innerHTML.length > 10) {
        return;
    }

    display.innerHTML = value;
}

function getDisplayValue() {
    let display = document.querySelector("p");
    return display.textContent;
}

function numberPress(e) {
    const buttonValue = e.target.textContent;

    if (operator === null) {
        if (buttonValue === ".") {
            if (firstOperand.includes(".")) {
                return;
            }
        }
        firstOperand =
            firstOperand === null || firstOperand === 0
                ? buttonValue
                : firstOperand + buttonValue;
        updateDisplay(firstOperand);
    } else {
        if (buttonValue === ".") {
            if (secondOperand.includes(".")) {
                return;
            }
        }
        secondOperand =
            secondOperand === null || secondOperand === 0
                ? buttonValue
                : secondOperand + buttonValue;
        updateDisplay(secondOperand);
    }
}

function clear() {
    document.querySelector("p").innerHTML = 0;
    if (operator == null) {
        firstOperand = 0;
    } else {
        secondOperand = 0;
    }
}

function operate(e) {
    if (operator !== null && firstOperand && secondOperand) {
        const result = calculate(firstOperand, secondOperand, operator);
        firstOperand = result;
        secondOperand = null;
        updateDisplay(result);
    }

    if (operator === null && firstOperand == null && secondOperand == null) {
        let display = document.querySelector("p");
        firstOperand = display.textContent;
    }

    operator = e.target.textContent;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        const result = Number(firstOperand) + Number(secondOperand);
        return parseFloat(result.toFixed(3));
    }
    if (operator === "÷") {
        const result = Number(firstOperand) / Number(secondOperand);
        return parseFloat(result.toFixed(3));
    }
    if (operator === "x") {
        const result = Number(firstOperand) * Number(secondOperand);
        return parseFloat(result.toFixed(3));
    }
    if (operator === "-") {
        const result = Number(firstOperand) - Number(secondOperand);
        return parseFloat(result.toFixed(3));
    }
}

function memoryAction(e) {
    return e.target.innerHTML == "M+"
        ? memoryPlus()
        : e.target.innerHTML == "M-"
        ? memoryMinus()
        : e.target.innerHTML == "MR"
        ? memoryRecall()
        : memoryClear();
}

function memoryPlus() {
    memory = getDisplayValue();
    document.querySelector("#memory").innerHTML = memory;
}

function memoryMinus() {
    // TBD
}

function memoryRecall() {
    if (operator == null) {
        firstOperand = memory;
        updateDisplay(firstOperand);
    } else {
        secondOperand = memory;
        updateDisplay(secondOperand);
    }
}

function memoryClear() {
    memory = null;
    document.querySelector("#memory").innerHTML = "No Memory";
}
