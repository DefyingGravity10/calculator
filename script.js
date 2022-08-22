function checkIfDecimalPresent(e) {
    if (defaultConfiguration && !decimalInA) {
        checkExpression(e);
        decimalInA = true;
    }
    else if (!defaultConfiguration && !decimalInB) {
        checkExpression(e);
        decimalInB = true;
    }
    else {
        alert("Invalid move!");
    }
}
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

    if (a == "") {
        checkIfCanOperate();
        clearContent();
    }

    else if (defaultConfiguration) {
        topCalcContents = `${bottomCalcContents} ${operations[0]} `;
        updateUpperScreenDisplay();
        bottomCalcContents = "";
        defaultConfiguration = false;
        return;
    }

    else {
        if (b == "" && operations.length > 1) {
            operations.shift();
            topCalcContents = `${a} ${operations[0]} `;
            updateUpperScreenDisplay(); 
        }

        else if (b == "") {
            topCalcContents = `${a} ${operations[0]} `;
            updateUpperScreenDisplay(); 
            bottomCalcContents = "";
            equalPressed = false;
        }
        else if (b != "" && !equalPressed) {
            operate();
            configure();
            topCalcContents = `${a} ${operations[0]} `;
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

function checkIfCanOperate(e) {
    if (a != "" && b != "") {
        operate();

        if (!divError) {
            topCalcContents += `${bottomCalcContents} ${e.target.getAttribute("id")}`;
            updateUpperScreenDisplay();
            configure();
            equalPressed = true;
        }
    }
    else {
        alert("Invalid Move!");
    }
}
function operate() {
    let numberOfDecimalPlaces = convertToWhole(operations[0]);
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

    if (result == "error") {
        alert("Error! You cannot divide a number by zero!");
        clearContent();
        divError = true;
    }
    else {
        revertToFloat(numberOfDecimalPlaces);
        console.log(`${a} ${operations[0]} ${b} = ${result}`);
        currentInput.textContent = result;
    }   
}

function convertToWhole(operation) {
    let decimalPlaces = 0;

    if ((!decimalInA && !decimalInB) || operation == "*" || operation == "/") {
        return decimalPlaces;
    }
    else if (!decimalInA){
        decimalPlaces = b.length-1 - b.indexOf(".");
        a = (Number(a) * 10 ** decimalPlaces).toString();
        b = (Number(b) * 10 ** decimalPlaces).toString();
        return decimalPlaces;
    }
    else if (!decimalInB) {
        decimalPlaces = a.length-1 - a.indexOf(".");
        a = (Number(a) * 10 ** decimalPlaces).toString();
        b = (Number(b) * 10 ** decimalPlaces).toString();
        return decimalPlaces;
    }
    else {
        decimalPlaces = Math.max((a.length-1 - a.indexOf(".")), (b.length-1 - b.indexOf(".")));
        a = (Number(a) * 10 ** decimalPlaces).toString();
        b = (Number(b) * 10 ** decimalPlaces).toString();
        return decimalPlaces;
    }
}

function revertToFloat(decimalPlaces) {
    result = roundOffToTenDp(Number(result) / 10 ** decimalPlaces).toString();
}

function roundOffToTenDp(number) {
    return Math.round(number * 10 ** 10) / 10 ** 10;
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
    return b == 0 ? "error" : a / b;
}

function configure() {
    a = result;
    b = "";
    decimalInA, decimalInB = false, false;
    operations.shift();
    bottomCalcContents = result;
    currentInput.textContent = a;
}

function clearContent() {
    a = "";
    b = "";
    operations = [];
    topCalcContents = "";
    bottomCalcContents = "";
    previousInput.textContent = "";
    currentInput.textContent = "";
    defaultConfiguration = true;
    equalPressed = false;
    divError = false;
    decimalInA = false;
    decimalInB = false;
}

function deleteContent() {
    let removedCharacter;

    if (defaultConfiguration) {
        removedCharacter = a[a.length-1];
        a = a.slice(0, a.length-1);
        bottomCalcContents = a;
        updateLowerScreenDisplay();

        if (removedCharacter == ".") {
            decimalInA = false;
        }

    }
    else {
        removedCharacter = b[b.length-1];
        b = b.slice(0, b.length-1);
        bottomCalcContents = b;
        updateLowerScreenDisplay();

        if (removedCharacter == ".") {
            decimalInB = false;
        } 
    }
}

function reverseSign() {
    if (defaultConfiguration) {
        if (a == "") {
            return;
        }
        a = (Number(a) * -1).toString();
        bottomCalcContents = a;
        updateLowerScreenDisplay();
    }
    else {
        if (b == "") {
            return;
        }
        b = (Number(b) * -1).toString();
        bottomCalcContents = b;
        updateLowerScreenDisplay();
    }
}

//Initialize default settings.
let a = "";
let b = "";
let decimalInA, decimalInB = false;
let topCalcContents = "";
let bottomCalcContents = "";
let operations = [];
let result;
let defaultConfiguration = true;
let equalPressed, divError = false;

//Add event listeners to all the buttons.
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", deleteContent);

const plusMinus = document.querySelector("#pm");
plusMinus.addEventListener("click", reverseSign);

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", checkExpression));

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", checkIfDecimalPresent);

const operators = document.querySelectorAll(".op");
operators.forEach(op => op.addEventListener("click", toggleOperator));

const evaluate = document.querySelector(".eval");
evaluate.addEventListener("click", checkIfCanOperate);

const ac = document.querySelector("#clear");
ac.addEventListener("click", clearContent);

const previousInput = document.querySelector("#prev-input");
const currentInput = document.querySelector("#current-input");