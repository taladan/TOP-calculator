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
    handleSpecials(key);
    // `=` requires special handling
  } else if (key === "=" && arithmeticObject.operator !== "=") {
    arithmeticObject.left = total(
      arithmeticObject.left,
      arithmeticObject.operator,
      arithmeticObject.right
    );
    display.set(arithmeticObject.left);
  } else if (arithmeticObject.operator === "=") {
    console.log("= in operator spot, panic.");
  }
}

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
    if (
      arithmeticObject.left &&
      arithmeticObject.operator &&
      arithmeticObject.right
    ) {
      display.set(
        total(
          parseFloat(arithmeticObject.left),
          arithmeticObject.operator,
          parseFloat(arithmeticObject.right)
        )
      );
    }
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

/*

Regarding the NaN error:


[2:00 PM]waVE: @taladan  figured out where NaN is happening.  after you get an
answer like  65 / 7  =  9.25, if you don't clear the display, the next
operation will throw NaN. Bill is in the mail. And by clear, I mean the back
button on the calc -- clear didn't work for me.    yep, the order [ 2, *, 4,
  =, 6, -, 3 , = ]  NaN. Hope that helps

  */

// arr = object with .left, .operator, .right

/* 
I just want to talk through the logic of what we're doing here

We receive an operator object that has three values:  'left', 'operator', and 'right'.

we also recieve a key.

A key can be:

A number = ".0-9"
An operator = "+, -, *, /"
An equivalency: "="

if the key is a number character and there is no value in
    arithmeticObject.right and there is no value in arithmeticObject.operator:
  character must be concatenated into arithmeticObject.left;
  
  --- if the key is a number character and there is a value in
    arithmeticObject.right and there is no value in arithmeticObject.operator:
  we have hit error state reset all values to initial state

  --- if the key is a number character and there is a value in
    arithmeticObject.right and there is a value in arithmeticObject.operator:
  character must be concatenated into arithmeticObject.right;

  --- if the key is an operator and there is no number in arithmeticObject.left
  and there is no value in arithmeticObject.right: we have hit error state:
  reset all values to initial state and ignore the key

  --- if the key is an operator and there is a value in arithmeticObject.left
  and there is no value in arithmeticObject.operator and there is no value in
    arithmeticObject.right: the key character must be stored in
    arithmeticObject.operator;

  --- if the key is an operator and there is a value in arithmeticObject.left
  and there is no value in arithmeticObject.operator and there is a value in
    arithmeticObject.right: we have hit error state: reset all values to
  initial state and ignore the key
  
  --- if the key is an operator and there is a value in arithmeticObject.left
  and there is a value in arithmeticObject.operator and there is a value in
    artihmeticObject.right: run the total() function passing left, operator,
    and right.  Total() will return a single value that should pack on the
  left, then the new operator keyed in should be added to
  arithmeticObject.operator
  

 --- if the key is an '=' and there is a value in arithmeticObject.left and a value in arithmeticObject.operator and arithmetciObject.right:
   run the total, passing left, operator and right, display the value and reset the left, operator, and right values to initial state.

 --- if the key is an '=' and there is no value in arithmeticObject.left OR no value in arithmeticObject.right:
  ignore the keypress and return whatever value is in the display to be packed to the left

 ---if the key is an '=' and there is a value in arithmeticObject.left but no value in arithmeticObject.right:
  ignore the keypress and return whatever value is in the display to be packed to the left

 --- NOTE:  = SHOULD NEVER BE PUT IN arithmeticObject.operator

*/

// function stowArithmetic2(object, key) {
//   if (object.left === NaN) {
//     object.left = "";
//   }
//   // No operator yet
//   if (!object.operator && operatorButtons.includes(key)) {
//     object.operator = key;
//     return object.left;
//   }

//   // ready to operate on both sides
//   // perform operation, pack & return left
//   if (
//     (object.operator !== "" || object.operator !== "=") &&
//     operatorButtons.includes(key) &&
//     object.left !== "" &&
//     object.right !== ""
//   ) {
//     console.log("TEST: Running total");
//     // total and return object packed left
//     object.left = total(
//       parseFloat(object.left),
//       object.operator,
//       parseFloat(object.right)
//     );
//     console.log("TEST: Packed left: " + object.left);
//     // if key is an operator, reassign object.operator
//     if (operatorButtons.includes(key)) {
//       console.log("TEST: reassign operator");
//       object.operator = key;

//       // empty out the operator in prep for next go
//     } else {
//       console.log("TEST: empty operator");
//       object.operator = "";
//     }

//     // always empty right side after total
//     console.log("TEST: empty right side");
//     object.right = "";
//     return object.left;
//   }

//   // edge case - left side is empty string but right side isn't
//   // move right side to left and empty out right and operator
//   if (object.right !== "" && object.left === "") {
//     object.left = object.right;
//     object.right = "";
//     object.operator = "";
//     return object.left;
//   }

//   // if key is an operator, left hand side isn't empty, operator isn't empty, right side IS empty
//   // redisplay left and change the operator
//   if (
//     operatorButtons.includes(key) &&
//     object.left !== "" &&
//     object.operator !== "" &&
//     object.right === ""
//   ) {
//     object.operator = key;
//     object.operator = key;
//     return object.left;
//   }

//   // handle numeric strings
//   if (numberButtons.includes(key)) {
//     if (!object.operator) {
//       if (object.left === "") {
//         object.left = key;
//       } else {
//         object.left += key;
//       }
//       return object.left;
//     } else {
//       if (object.right === "") {
//         object.right = key;
//       } else {
//         object.right += key;
//       }
//       return object.right;
//     }
//   }
// }

function resetValues() {
  arithmeticObject.left = "";
  arithmeticObject.operator = "";
  arithmeticObject.right = "";
}

function total(left, operator, right) {
  switch (operator) {
    case "+":
      value = add(left, right);
      resetValues();
      return value;
      break;
    case "-":
      value = subtract(left, right);
      resetValues();
      return value;
    case "*":
      value = multiply(left, right);
      resetValues();
      return value;
      break;
    case "/":
      value = divide(left, right);
      resetValues();
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
  if (object.left === NaN) {
    object.left = "";
  }
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
