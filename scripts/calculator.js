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
  return a / b;
}

// call correct function for operator and two numbers
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
  }
}

/* set up our variables */
const calculator = document.getElementById("calculator");
const display = document.getElementById("display");
const specialsDiv = document.getElementById("specials");
const numbersDiv = document.getElementById("numbers");
const operatorsDiv = document.getElementById("operators");

// Buttons
const buttonsArray = Array.from(document.querySelectorAll("button"));
const operatorButtonsArray = Array.from(operators.querySelectorAll("button"));
const numberButtonsArray = Array.from(numbersDiv.querySelectorAll("button"));

/* event handlers */
//
//
// kb operation
window.addEventListener("keydown", keyHandler);
window.addEventListener("keyup", keyHandler);

// mouse operation
calculator.addEventListener("mousedown", mouseHandler);
calculator.addEventListener("mouseup", mouseHandler);

// return array of all text in all buttons
const getButtonTexts = function (buttons) {
  return buttons.map(getText);
  function getText(button) {
    return button.textContent;
  }
};

buttonTexts = getButtonTexts(buttonsArray);
buttonTexts.push("Enter");

// kb functionality
function keyHandler(event) {
  let key = event.key;
  let target = event.target;
  // Catch Enter and map to '=' and Escape to 'c'
  if (key === "Enter") {
    key = "=";
  } else if (key === "Escape") {
    key = "C";
    clearDisplay();
  }
  if (buttonTexts.includes(key)) {
    let accumulator = "";
    buttonsArray[buttonTexts.indexOf(key)].classList.toggle("pressed");
  }
}

// mouse functionality
function mouseHandler(event) {
  let target = event.target;
  let buttonText = target.textContent;
  let buttonType = target.parentNode.id;
  target.classList.toggle("pressed");
}

function clearDisplay() {
  display.textContent = "";
}
