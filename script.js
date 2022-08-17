function checkExpression(e) {
    if (operationPressed != true) {
        a += e.target.getAttribute("id");
    }
    else {
        b += e.target.getAttribute("id");
    }
}

function toggleOperator(e) {
    if (operationPressed) {
        operate();
        operation = e.target.getAttribute("id");
    }
    else {
        operationPressed = true;
        operation = e.target.getAttribute("id");
    }
}

function operate() {
    switch(operation) {
        case ("add"): 
            result = add(Number(a), Number(b));
            break;
        case("subtract"): 
            result = subtract(Number(a), Number(b));
            break;
        case("multiply"):
            result = multiply(Number(a), Number(b));
            break;
        case("divide"):
            result = divide(Number(a), Number(b));
            break;
    }
    console.log(result);
    reset();
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

function reset() {
    a = "";
    b = "";
    operationPressed = false;
}

let a = "";
let b = "";
let operationPressed = false; 
let operation;
let result;

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", checkExpression));

const operators = document.querySelectorAll(".op");
operators.forEach(op => op.addEventListener("click", toggleOperator));

const evaluate = document.querySelector(".eval");
evaluate.addEventListener("click", operate);