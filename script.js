function checkExpression(e) {
    if (defaultConfiguration) {
        a += e.target.getAttribute("id");
        bottomCalcContents += e.target.getAttribute("id");
        updateLowerScreenDisplay();
    }
    else {
        b += e.target.getAttribute("id");
        bottomCalcContents += e.target.getAttribute("id");
        updateLowerScreenDisplay();
    }
}

function toggleOperator(e) {
    operations.push(e.target.getAttribute("id"));

    if (defaultConfiguration) {
        topCalcContents = `${bottomCalcContents} ${operations[0]} `;
        updateUpperScreenDisplay();
        bottomCalcContents = "";
        defaultConfiguration = false;
        return;
    }

    else {
        if (b == "" && equalPressed) {
            topCalcContents = `${result} ${operations[0]} `;
            updateUpperScreenDisplay(); 
            bottomCalcContents = "";
            equalPressed = false;
        }
        else if (b != "" && !equalPressed) {
            operate();
            configure();
            topCalcContents = `${result} ${operations[0]} `;
            updateUpperScreenDisplay();
            bottomCalcContents = "";
        }
    }
}

function updateUpperScreenDisplay() {
    previousInput.textContent = topCalcContents;
}

function updateLowerScreenDisplay() {
    currentInput.textContent = bottomCalcContents;
}

function operate() {
    switch(operations[0]) {
        case ("+"): 
            result = add(Number(a), Number(b));
            break;
        case("-"): 
            result = subtract(Number(a), Number(b));
            break;
        case("*"):
            result = multiply(Number(a), Number(b));
            break;
        case("/"):
            result = divide(Number(a), Number(b));
            break;
    }
    console.log(`${a} ${operations[0]} ${b} = ${result}`);
    currentInput.textContent = result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b == 0 ? "Error. Cannot divide a number by 0." : a / b;
}

function configure() {
    a = result;
    b = "";
    operations.shift();
    bottomCalcContents = result;
    currentInput.textContent = a;
}

let a = "";
let b = "";
let topCalcContents = "";
let bottomCalcContents = "";
let operations = [];
let result;
let defaultConfiguration = true;
let equalPressed = false;

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", checkExpression));

const operators = document.querySelectorAll(".op");
operators.forEach(op => op.addEventListener("click", toggleOperator));

const evaluate = document.querySelector(".eval");
evaluate.addEventListener("click", operate);
evaluate.addEventListener("click", (e) => {
    topCalcContents += `${bottomCalcContents} ${e.target.getAttribute("id")}`;
    updateUpperScreenDisplay();
    configure();
    equalPressed = true;
});

const ac = document.querySelector("#clear");
ac.addEventListener("click", () => {
    a = "";
    b = "";
    operations = [];
    topCalcContents = "";
    bottomCalcContents = "";
    previousInput.textContent = "";
    currentInput.textContent = "";
    defaultConfiguration = true;
    equalPressed = false;
});

const previousInput = document.querySelector("#prev-input");
const currentInput = document.querySelector("#current-input");