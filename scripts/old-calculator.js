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

// ['+', '-', '*', '/']
const operatorButtons = getButtonTexts(
  Array.from(operators.querySelectorAll("button"))
);

// ['C', '⌫', '=']
const specialButtons = getButtonTexts(
  Array.from(specials.querySelectorAll("button"))
);

// storage for equation data
const arithmeticObject = { left: "", operator: "", right: "" };
let workingSide = "left";

function toggleWorkingSide() {
  if (workingSide === "left") {
    workingSide = "right";
  } else {
    workingSide = "left";
  }
}

// display handling
const display = {
  set(value) {
    //value = value || 0;
    document.getElementById("display").textContent = value;
  },
  get() {
    return document.getElementById("display").textContent;
  },
  clear() {
    const display = (document.getElementById("display").textContent = "");
    resetValues();
  },
};

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
    events(key);
  }
}

// convert and pass to events
function mouseConvertEvent(event) {
  let key = event.target.textContent;
  events(key);
}

// TODO integrate back into code
function events(key) {
  // Don't allow multiple decimal entry
  if (key === "." && display.get().includes(".")) {
    console.log("Multiple decimals detected!");
    return;
  }

  // deal with numbers
  if (numberButtons.includes(key)) {
    display.set(handleNumbers(key));
  }

  // deal with operators
  if (operatorButtons.includes(key)) {
    handleOperators(key);
    display.set(stowArithmetic(arithmeticObject, key));
  }

  // we need to deal with special keys:
  if (specialButtons.includes(key)) {
    handleSpecials(key);
  }
}

function validateArithmeticObject() {
  // const sides = [arithmeticObject.left, arithmeticObject.right];
  const sides = ["left", "operator", "right"];
  for (side of sides) {
    // we should never have a null, undefined or NaN value in either side
    if (
      arithmeticObject[side] === null ||
      arithmeticObject[side] === undefined ||
      isNaN(arithmeticObject[side])
    ) {
      console.log(`Converting from ${side} to empty string`);
      arithmeticObject[side] = "";
    }
    // Numbers stored should be strings
    if (typeof side !== "string") {
      arithmeticObject[side] = String(arithmeticObject[side]);
    }
  }
}

function handleNumbers(key) {
  validateArithmeticObject();
  console.log("concat key to working side");
  arithmeticObject[workingSide] = arithmeticObject[workingSide].concat(key);
  return arithmeticObject[workingSide];
}

function handleOperators(key) {
  validateArithmeticObject();
  // when an operator is recieved, we need to toggle working side
  toggleWorkingSide();

  // see if we already have an operator
  if (operatorButtons.includes(arithmeticObject.operator)) {
    if (arithmeticObject.left > "" && arithmeticObject.right > "") {
      // perform calculation
    }
  } else if (arithmeticObject.operator === "") {
    console.log("HandleOperators: assigning operator");
    console.log(key);
    arithmeticObject.operator = key;
    console.log(arithmeticObject.operator);
  }
}

function testDoNumberStuff() {
  console.log("Testing doNumberStuff");
  stuff = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  for (number of stuff) {
    handleNumbers(number);
  }
}

// Use this for testing stuff
function test() {
  console.log(`Working on side: ${workingSide}`);
  testDoNumberStuff();
  toggleWorkingSide();
  console.log(`Working on side: ${workingSide}`);
  testDoNumberStuff();
  console.log(arithmeticObject);
}

//////////////////// vvv  Working on changing functionality here vvv ///////////////////////
function oldEvents(key) {
  // Don't allow multiple decimal entry
  if (key === "." && display.get().includes(".")) {
    console.log("Multiple decimals detected!");
    return;
  }
  // we need to deal with special keys:
  if (numberButtons.includes(key) || operatorButtons.includes(key)) {
    display.set(stowArithmetic(arithmeticObject, key));
  } else if (specialButtons.includes(key)) {
    handleSpecials(key);
    // `=` requires special handling
  } else if (key === "=" && arithmeticObject.operator !== "=") {
    arithmeticObject.left = total(arithmeticObject);
    //   arithmeticObject.left,
    //   arithmeticObject.operator,
    //   arithmeticObject.right
    // );
    display.set(arithmeticObject.left);
  } else if (arithmeticObject.operator === "=") {
    console.log("= in operator spot, panic.");
  }
}
//////////////////// ^^^ Working on changing functionality here ^^^ ///////////////////////

function handleSpecials(key) {
  if (key === "⌫") {
    // removing characters from the end of the display string and the object
    display.set(doBackspace());
  }
  if (key === "C") {
    arithmeticObject.left = "";
    arithmeticObject.operator = "";
    arithmeticObject.right = "";
    display.clear();
  }
  if (key === "=") {
    console.log("= pressed");
    if (arithmeticObjectReadyForTotal) {
      console.log("Totalling arithObj");
      let myValue = total(arithmeticObject);
      console.log(myValue);
      // display.set(total(arithmeticObject));
      display.set(total(arithmeticObject));
    }
  }
}

function arithmeticObjectReadyForTotal() {
  return (
    numberButtons.includes(arithmeticObject.left.slice(0, 1)) &&
    numberButtons.includes(arithmeticObject.right.slice(0, 1)) &&
    operatorButtons.includes(arithmeticObject.operator)
  );
}

function doBackspace() {
  // if an operator isn't empty and right side isn't empty:
  // remove character from right side
  if (arithmeticObject.operator !== "" && arithmeticObject.right !== "") {
    console.log(
      "TEST: Arithmetic operator isn't empty and right side is not empty"
    );
    return (arithmeticObject.right = trimString(arithmeticObject.right));

    // if operator exists and right side is empty:
    // do nothing
  } else if (
    arithmeticObject.operator !== "" &&
    arithmeticObject.right === ""
  ) {
    console.log(
      "TEST: Arithmetic operator isn't empty and right side is empty"
    );
    return arithmeticObject.left;

    // no operator exists and left side isn't empty:
    // remove character from left side
  } else if (
    arithmeticObject.operator === "" &&
    arithmeticObject.right === "" &&
    arithmeticObject.left !== ""
  ) {
    return (arithmeticObject.left = trimString(arithmeticObject.left));

    // left side and operator are both empty:
    // do nothing
  } else if (arithmeticObject.operator === "" && arithmeticObject.left === "") {
    return arithmeticObject.left;
  }
}

function trimString(str) {
  if (str.length > 1) {
    return (str = str.slice(0, -1));
  } else {
    return (str = "");
  }
}

function addAnimation(e) {
  //pass
}

function removeAnimation(e) {
  //pass
}

function resetValues() {
  arithmeticObject.left = "";
  arithmeticObject.operator = "";
  arithmeticObject.right = "";
}

function total(object) {
  let left = parseFloat(object.left);
  let operator = object.operator;
  let right = parseFloat(object.right);
  console.log(
    `Working elements: Left: ${left}, Operator: ${operator}, Right: ${right}`
  );

  switch (operator) {
    case "+":
      value = add(left, right);
      resetValues();
      console.log(value);
      return value;
      break;
    case "-":
      value = subtract(left, right);
      resetValues();
      console.log(value);
      return value;
    case "*":
      value = multiply(left, right);
      resetValues();
      console.log(value);
      return value;
      break;
    case "/":
      value = divide(left, right);
      resetValues();
      console.log(value);
      return value;
      break;
  }
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
  return (a / b).toFixed(2);
}

function stowArithmetic(object, key) {
  // No operator yet
  if (!object.operator && operatorButtons.includes(key)) {
    object.operator = key;
    return object.left;
  }

  // ready to operate on both sides
  // perform operation, pack & return left
  if (
    (object.operator !== "" || object.operator !== "=") &&
    operatorButtons.includes(key) &&
    object.left !== "" &&
    object.right !== ""
  ) {
    console.log("TEST: Running total");
    // total and return object packed left
    object.left = total(arithmeticObject);
    //   parseFloat(object.left),
    //   object.operator,
    //   parseFloat(object.right)
    // );
    console.log("TEST: Packed left: " + object.left);
    // if key is an operator, reassign object.operator
    if (operatorButtons.includes(key)) {
      console.log("TEST: reassign operator");
      object.operator = key;

      // empty out the operator in prep for next go
    } else {
      console.log("TEST: empty operator");
      object.operator = "";
    }

    // always empty right side after total
    console.log("TEST: empty right side");
    object.right = "";
    return object.left;
  }

  // edge case - left side is empty string but right side isn't
  // move right side to left and empty out right and operator
  if (object.right !== "" && object.left === "") {
    object.left = object.right;
    object.right = "";
    object.operator = "";
    return object.left;
  }

  // if key is an operator, left hand side isn't empty, operator isn't empty, right side IS empty
  // redisplay left and change the operator
  if (
    operatorButtons.includes(key) &&
    object.left !== "" &&
    object.operator !== "" &&
    object.right === ""
  ) {
    object.operator = key;
    object.operator = key;
    return object.left;
  }

  // handle numeric strings
  if (numberButtons.includes(key)) {
    if (!object.operator) {
      if (object.left === "") {
        object.left = key;
      } else {
        object.left += key;
      }
      return object.left;
    } else {
      if (object.right === "") {
        object.right = key;
      } else {
        object.right += key;
      }
      return object.right;
    }
  }
}
