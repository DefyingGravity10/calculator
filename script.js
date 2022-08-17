function checkExpression(e) {
    defaultConfiguration = false;
    if (operations.length == 0) {
        a += e.target.getAttribute("id");
        calcContents += e.target.getAttribute("id");
        updateScreenDisplay();
    }
    else {
        b += e.target.getAttribute("id");
        calcContents += e.target.getAttribute("id");
        updateScreenDisplay();
    }
}

function toggleOperator(e) {
    operations.push(e.target.getAttribute("id"));
    calcContents += ` ${e.target.getAttribute("id")} `;
    updateScreenDisplay();

    if (operations.length > 1) {
        operate();
    } 

    if (!defaultConfiguration) {
        calcContents = `${a} ${e.target.getAttribute("id")} `;
        updateScreenDisplay();
        currentInput.textContent = "";
    }


}

function updateScreenDisplay() {
    previousInput.textContent = calcContents;
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
    configure();
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

    if (operations.length > 1) {
        calcContents = `${a} ${operations[0]}`;
        previousInput.textContent = calcContents;
        currentInput.textContent = "";
    }
    
    
}

let a = "";
let b = "";
let operations = [];
let result;
let defaultConfiguration = true;

let calcContents = "";

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", checkExpression));

const operators = document.querySelectorAll(".op");
operators.forEach(op => op.addEventListener("click", toggleOperator));

const evaluate = document.querySelector(".eval");
evaluate.addEventListener("click", operate);
evaluate.addEventListener("click", (e) => {
    calcContents += ` ${e.target.getAttribute("id")}`;
    updateScreenDisplay();
});

const ac = document.querySelector("#clear");
ac.addEventListener("click", () => {
    a = "";
    b = "";
    operations = [];
    calcContents = "";
    previousInput.textContent = "";
    currentInput.textContent = "";
    defaultConfiguration = true;
});

const previousInput = document.querySelector("#prev-input");
const currentInput = document.querySelector("#current-input");