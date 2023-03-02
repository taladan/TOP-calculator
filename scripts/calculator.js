// start from fresh, rethink the whole ball of wax.

// 1 + 1 = 2

/*
  To get the above in a calculator, first we push the button '1'.  This is true for any number up to infinity
  we just keep pushing numbers and the calculator pushes them into the display for use after an operator key is pushed
  once an operator is pushed, it puts that operation on the stack and then moves to inputing a fresh number.  
  once another operator is pushed (or equals) it should then perform the calculation, remove the previous operator and 
  pack everything to the left hand side, allowing only an operator to be added if you want to use that sum to continue a 
  calculation, or another number if you want to perform a new calculation.

  Once enter/= is pressed, the operation is run (assuming it can be run) and everything is totalled and put on display
  after = is pressed, we will listen for operator keys or number keys and act accordingly as previously stated.

*/

/* initialization section begin */
const getButtonTexts = function (arrayOfButtons) {
  return arrayOfButtons.map((button) => button.textContent);
};
const calcDiv = document.getElementById("calculator");
const calcButtons = calcDiv.querySelectorAll("button");
const calculator = getButtonTexts(Array.from(calcButtons));

const displayDiv = document.getElementById("display");

const numDiv = document.getElementById("numbers");
const numButtons = numDiv.querySelectorAll("button");
const numbers = getButtonTexts(Array.from(numButtons));

const opDiv = document.getElementById("operators");
const opButtons = opDiv.querySelectorAll("button");
const operators = getButtonTexts(Array.from(opButtons));

const specDiv = document.getElementById("specials");
const specButtons = specDiv.querySelectorAll("button");
const specials = getButtonTexts(Array.from(specButtons));

// animation of buttons only
window.addEventListener("keydown", animate);
window.addEventListener("keyup", unanimate);

// input only
window.addEventListener("keydown", eventHandler);

let expression = [];
let accumulator = "";
let inputSide = "left";

/* initialization section end */

function eventHandler(e) {
  let key = e.key;
  key = remapEnterAndEscape(key);

  if (numbers.includes(key)) {
    manipulateExpression(handleNumbers(key));
  }
  if (operators.includes(key)) {
    handleOperators(key);
  }
  if (specials.includes(key)) {
    handleSpecials(key);
  }

  handleDisplay();
}

/* working area functions begin*/

function handleDisplay() {
  let displayValue;
  if (inputSide === "left") {
    displayValue = expression[0];
  } else {
    displayValue = expression[2];
  }
  displayDiv.textContent = displayValue;
}

function clearDisplay() {
  displayDiv.textContent = "";
  accumulator = "";
  inputSide = "left";
  clearExpression();
}

/* working area functions end */

/* expression manipulation functions begin */

function toggleExprSide() {
  // left == expression[0]
  // right == expression[2]
  if (inputSide === "left") {
    inputSide = "right";
    accumulator = "";
  } else {
    inputSide = "left";
    accumulator = "";
  }
}

function manipulateExpression(value) {
  console.log("Manipulate expression is passing value: " + value);
  if (inputSide === "left") {
    expression[0] = value;
  } else {
    expression[2] = value;
  }
}

function exprReadyForCalculation() {
  return (
    typeof expression[0] !== "undefined" &&
    typeof expression[1] !== "undefined" &&
    typeof expression[2] !== "undefined"
  );
}

function testExpression() {
  expression[0] = "1.11678";
  expression[1] = "+";
  expression[2] = "1.32678";
}

function calculateExpression() {
  console.log("Calculating expression");
  console.log("Accumulator: " + accumulator);
  console.log("InputSide: " + inputSide);
  console.log("Expression: " + expression);
  let a = parseFloat(expression[0]);
  let b = parseFloat(expression[2]);
  let value;
  switch (expression[1]) {
    case "+":
      value = parseFloat((a + b).toFixed(2));
      break;
    case "-":
      value = parseFloat((a - b).toFixed(2));
      break;
    case "*":
      value = parseFloat((a * b).toFixed(2));
      break;
    case "/":
      value = parseFloat((a / b).toFixed(2));
      break;
  }
  console.log("CalculateExpression returning value:> " + value);
  return value;
}

function clearExpression() {
  expression.length = 0;
}
/* expression manipulation functions end */

/* animation section begin */
function animate(e) {
  let key = e.key;
  key = remapEnterAndEscape(key);
  if (calculator.includes(key)) {
    for (let button of calcButtons) {
      if (button.textContent === key) {
        document.getElementById(key).classList.add("pressed");
      }
    }
  }
  return;
}

function unanimate(e) {
  let key = e.key;
  key = remapEnterAndEscape(key);
  if (calculator.includes(key)) {
    for (let button of calcButtons) {
      if (button.textContent === key) {
        document.getElementById(key).classList.remove("pressed");
      }
    }
  }
  return;
}
/* animation section end */

/* key handling section begin */
function handleNumbers(key) {
  accumulator += key;
  return accumulator;
}

function handleOperators(key) {
  if (exprReadyForCalculation()) {
    packExpression();
  }
  expression[1] = key;
  toggleExprSide();
}

function packExpression() {
  let value = calculateExpression();
  expression[0] = value;
  expression[1] = "";
  expression[2] = "";
}

function handleSpecials(key) {
  // testing
  console.log("handleSpecials function entered");
  if (key === "C") {
    clearDisplay();
  } else if (key === "=") {
    total();
  } else if (key === "⌫") {
    backspaceChar();
  }
  return;
}

function remapEnterAndEscape(key) {
  if (key === "Enter") {
    return "=";
  } else if (key === "Escape" || key === "c") {
    return "C";
  } else if (key === "Backspace") {
    return "⌫";
  } else {
    return key;
  }
}

/* end key handling section */
