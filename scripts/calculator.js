// get containers

// TODO:  Ensure these are used or deleted
const calculatorDiv = document.getElementById("calculator");
const numbersDiv = document.getElementById("numbers");
const operatorsDiv = document.getElementById("operators");
const specialsDiv = document.getElementById("specials");

// we need event listeners for mouse and kb entry
calculatorDiv.addEventListener("click", mouseConvertEvent);
window.addEventListener("keydown", keyConvertEvent);

// event listeners for animations
window.addEventListener("keydown", addAnimation);
window.addEventListener("keyup", addAnimation);

//
// Button text values
//

// String data
const getButtonTexts = function (arrayOfButtons) {
  return arrayOfButtons.map((button) => button.textContent);
};

// ['C', '⌫', '+', '-', '*', '/', '=', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.']
const allButtons = getButtonTexts(
  Array.from(calculatorDiv.querySelectorAll("button"))
);

// ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.']
const numberButtons = getButtonTexts(
  Array.from(numbersDiv.querySelectorAll("button"))
);

// ['+', '-', '*', '/', '=']
const operatorButtons = getButtonTexts(
  Array.from(operators.querySelectorAll("button"))
);

// ['C', '⌫']
const specialButtons = getButtonTexts(
  Array.from(specials.querySelectorAll("button"))
);

/* Event Handling */

// convert and pass to events
function keyConvertEvent(event) {
  let key = event.key;

  // Capture common buttons to key correctly
  if (key === "Backspace") {
    key = "⌫";
  } else if (key === "Escape") {
    key = "C";
  } else if (key === "Enter") {
    key = "=";
  }

  if (allButtons.includes(key)) {
    event(key);
  }
}

// convert and pass to events
function mouseConvertEvent(event) {
  let key = event.target.textContent;
  event(key);
}

function event(key) {
  switch (true) {
    case numberButtons.includes(key):
      console.log("Button in number list");
      break;
    case operatorButtons.includes(key):
      console.log("Button in operator list");
      break;
    case specialButtons.includes(key):
      console.log("Button in specials list");
      break;
    default:
    // if somehow an invalid button slipped through, do nothing
  }
}

function addAnimation(e) {
  //pass
}

function removeAnimation(e) {
  //pass
}

/* Everything below this point is deprecated code and should be considered non-functional */
//
//
//
//
// That said, this will be cleaned up at a later date.
//
//
//
//
// /* set up our variables */
// const calculator = document.getElementById("calculator");
// const display = document.getElementById("display");
// const specialsDiv = document.getElementById("specials");
// const numbersDiv = document.getElementById("numbers");
// const operatorsDiv = document.getElementById("operators");
// let keyAccumulator = [];
// let pairAccumulator = [];

// // Buttons
// const allButtons = Array.from(document.querySelectorAll("button"));
// const operatorButtons = Array.from(operators.querySelectorAll("button"));
// const numberButtonsArray = Array.from(numbersDiv.querySelectorAll("button"));

// /* event handlers */
// //
// //
// // kb operation
// window.tddEventListener("keydown", keyHandler);
// window.addEventListener("keyup", keyHandler);

// // mouse operation
// calculator.addEventListener("mousedown", keyHandler);
// calculator.addEventListener("mouseup", keyHandler);

// /* Button texts */
// //
// //
// // return array of all text in all buttons
// const getButtonTexts = function (buttons) {
//   return buttons.map(getText);
//   function getText(button) {
//     return button.textContent;
//   }
// };

// allButtonTexts = getButtonTexts(allButtons);
// operatorButtonTexts = getButtonTexts(operatorButtons);
// numberButtonTexts = getButtonTexts(numberButtonsArray);

// // capture Enter and Escape as well for later remaping
// allButtonTexts.push("Enter");
// allButtonTexts.push("Escape");

// // cache value for operations
// let numberCache;

// // Operator functions
// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   return a / b;
// }

// // call correct function for operator and two numbers
// function operate(operator, a, b) {
//   // convert to numbers
//   a = parseFloat(a);
//   b = parseFloat(b);

//   //operations
//   switch (operator) {
//     case "+":
//       return add(a, b);
//       break;
//     case "-":
//       return subtract(a, b);
//       break;
//     case "*":
//       return multiply(a, b);
//       break;
//     case "/":
//       return divide(a, b);
//       break;
//   }
// }

// function setDisplay(number) {
//   numberCache = display.textContent;
//   display.textContent = number;
// }

// function keyHandler(event) {
//   // readability
//   let key = event.key;
//   let target = event.target;
//   let buttonText = target.textContent;
//   let type = event.type;
//   let operator = "";
//   // capture enter, escape and mouse
//   switch (key) {
//     case undefined:
//       key = buttonText;
//       break;
//     case "Enter":
//       key = "=";
//       break;
//     case "Escape":
//       key = "C";
//       clearDisplay();
//       break;
//   }

//   // only fire if buttons are in calculator
//   if (allButtonTexts.includes(key)) {
//     // these things should fire only on keydown/mousedown
//     if (type === "keydown" || type === "mousedown") {
//       // change mouse input to key input
//       allButtons[allButtonTexts.indexOf(key)].classList.add("pressed");
//     }

//     // these things should fire only on keyup/mouseup
//     if (type === "keyup" || type === "mouseup") {
//       allButtons[allButtonTexts.indexOf(key)].classList.remove("pressed");
//       console.log(keyAccumulator);
//       if (numberButtonTexts.includes(key)) {
//         console.log(key);
//         keyAccumulator.push(key);
//         setDisplay(keyAccumulator.join(""));
//       } else if (operatorButtonTexts.includes(key)) {
//         // refactor here
//         // we should be operating on the value in
//         // display as the first number and whatever
//         // is entered after as the 2nd number.
//         //
//         operator = key;
//         // pairAccumulator.push(num);
//         keyAccumulator = [];
//         setDisplay(operate(operator, numberCache, display.textContent));
//       }
//     }
//   }
// }

// function clearDisplay() {
//   // clear array and display
//   Array().fill(keyAccumulator, null);
//   display.textContent = "";
// }
