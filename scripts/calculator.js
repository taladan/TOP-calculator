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

// necessary values
const arithmeticObject = { left: "", operator: "", right: "" };
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

function events(key) {
  // we need to deal with special keys:
  if (numberButtons.includes(key) || operatorButtons.includes(key)) {
    display.set(stowArithmetic(arithmeticObject, key));
  } else if (specialButtons.includes(key)) {
    doSpecialStuff(key);
    // `=` requires special handling
  } else if (key === "=") {
    arithmeticObject.left = total(
      arithmeticObject.left,
      arithmeticObject.operator,
      arithmeticObject.right
    );
    display.set(arithmeticObject.left);
  }
}

function doSpecialStuff(key) {
  if (key === "⌫") {
    // removing characters from the end of the display string and the object
    display.set(doBackspace());
  }
  if (key === "C") {
    arithmeticObject.left = "";
    arithmeticObject.operator = "";
    arithmeticObject.right = "";
    display.clear;
  }
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
    console.log("TEST: Arithmetic operator is empty and left side isn't empty");
    console.log("TEST: Original string: " + arithmeticObject.left);
    console.log("TEST: Trimmed string: " + trimString(arithmeticObject.left));
    return (arithmeticObject.left = trimString(arithmeticObject.left));

    // left side and operator are both empty:
    // do nothing
  } else if (arithmeticObject.operator === "" && arithmeticObject.left === "") {
    console.log("TEST: Arithmetic operator is empty and left side is empty");
    return arithmeticObject.left;
  }
}

function trimString(str) {
  console.log("TEST: Trimming string: " + str + "of length: " + str.length);
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

// arr = object with .left, .operator, .right
function stowArithmetic(object, key) {
  // No operator yet
  if (!object.operator && operatorButtons.includes(key)) {
    object.operator = key;
    return object.left;
  }

  // ready to operate on both sides
  // perform operation, pack & return left
  if (
    object.operator &&
    operatorButtons.includes(key) &&
    object.left !== "" &&
    object.right !== ""
  ) {
    console.log("TEST: Running total");
    // total and return object packed left
    object.left = total(
      parseFloat(object.left),
      object.operator,
      parseFloat(object.right)
    );
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

function total(left, operator, right) {
  if (left !== "" && operator !== "" && right !== "") {
    switch (operator) {
      case "+":
        return add(left, right);
        break;
      case "-":
        return subtract(left, right);
      case "*":
        return multiply(left, right);
        break;
      case "/":
        return divide(left, right);
        break;
    }
  } else {
    console.log("TEST: Total called with bad state:");
    console.log(`left: ${left}, operator: ${operator}, right ${right}`);
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
