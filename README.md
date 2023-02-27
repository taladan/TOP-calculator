# TOP-calculator

## Assignment

Don’t forget to commit early & often! You can reference the Commit Message lesson here!

Here are some use cases (abilities your project needs to have):

Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

- add
- subtract
- multiply
- divide

Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
Do not worry about wiring up the JS just yet.

There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.
Add a “clear” button.

Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.
Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.
You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.

This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

### Gotchas:

_watch out for and fix these bugs if they show up in your code:_

Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 \* 3 = should yield 42. An example of the behavior we’re looking for would be this student solution.
Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
You should round answers with long decimals so that they don’t overflow the screen.
Pressing = before entering all of the numbers or an operator could cause problems!
Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

Extra Credit

- Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)

- Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.

- Add a “backspace” button, so the user can undo if they click the wrong number.

- Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.

# Calculator Assignment Pseudocode

The assignment is to create a web based calculator that can do the following:

1. add
2. subtract
3. multiply
4. divide
5. total calculations
6. clear screen

The user should be able to enter numbers by either:

- Clicking a numbered button
- keying in a number on their keyboard

## Design

The body of the calculator should be a single container. This container should have a `calculator.addEventListener` that detects mouse clicks (mousedown and mouseup).

To be able to catch keyboard numbers and operators that are in the calculator container there has to be a `window.addEventListner` that is listening for key presses.

### Containers

The calculator container should also have four seperate containers within it:

1. A display container that has the current value being entered/operated on and/or the totalled value
2. A numbers container that just has numeric buttons (0-9 and .)
3. An operators container that just has operator buttons (+, -, \*, /)
4. A specials container that just has special buttons (C, AC, Backspace)

### Event logic

There will be two even listeners on the window for keydown events and at least one event listener on the calculator for mouse click events.

The first window event listener will handle the key logic, the second will handle the animation logic for the buttons.

The calculator listener will handle button presses - animation should go through styling.

When a user clicks a button or hits a button on the keyboard we need to:

1. See if the key/button is within the calculator container
2. If the key/button is in the calculator container, find which container it's in:
   - If it's in the operators container, [[#Operator Handling]]
   - If it's in the specials container, [[#Specials Handling]]
   - If it's in the numbers container, [[#Number Handling]]
3. All buttons get [[#Style Handling]]

#### Event Listeners

```js
// syntax

window.addEventListener("keydown", keyHandler);
window.addEventListener("keydown", animationHandler);

const calculator = document.getElementById("container");
calculator.addEventListener("click", mouseHandler);
```

#### Event handlers

##### Key Handler

When a key is pressed, it's captured and sent to `keyHandler`. We are listening for values that exist within the scope of the body of the calculator. To have something to match against, we need an array of all the values from the document's buttons. To do that, first we gather an array of all the buttons:

```js
// syntax
const allButtons = document.querySelectorAll("button");
```

Then we iterate through the array of buttons and make an array of all the texts in each button:

We also need arrays that store the values of just buttons in the numbers container, the operators container and the specials container. getButtonTexts should be its own function.

```js
// getButtonTexts syntax
const getButtonTexts = function (arrayOfButtons) {
  return arrayOfButtons.map((button) => button.textContent);
};
```

```js
const numberButtons = getButtonTexts(
  Array.from(numbers.querySelectorAll("button"))
);

const operatorButtons = getButtonTexts(
  Array.from(operators.querySelectorAll("button"))
);

const specialButtons = getButtonTexts(
  Array.from(specials.querySelectorAll("button"))
);
```

Once we have all of the texts from each button, we can handle the key properly.

- Test to see if the key is in the list of buttons
- If key is in buttons, determine if it's a number, operator, or special and call the appropriate function

```js
// syntax

function keyHandler(event){
  let key = event.key;
  switch buttonValues.includes(key){
    case numberButtons.includes(key):
      numberHandler(key);
      break;
    case operatorButtons.includes(key):
      operatorHandler(key);
      break;
    case specialButtons.includes(key):
      specialHandler(key);
      break;
    default:
      // something broke
  };
};
```

##### Mouse Handler

```js
// syntax

function mouseHandler() {}
```

##### Animation Handler

```js
// syntax

function animationHandler() {}
```

### Needed functions

#### Number Handling

Numbers will be entered one at a time as strings, building a total 'number' that some operation is to be done on. For handling the numbers, we will be using an array that accumulates each string 'digit' that is entered. Decimal numbers should be handled sanely.

- string digits are pushed to an array as they are entered
- Once a number is pushed onto the array, it should push to [[#Display Handling]]

```js
// syntax
let STRING_DIGITS_ARRAY = [];
function numberHandler(char) {
  if (char === "." && STRING_DIGITS_ARRAY.includes(char)) {
    return STRING_DIGITS_ARRAY;
  } else {
    STRING_DIGITS_ARRAY.push(s);
    return STRING_DIGITS_ARRAY;
  }
}
```

#### Operator Handling

First convert the two number strings created in [[#Number Handling]] to floats

```js
const a = myArray[0];
const b = myArray[1];
```

Each operator will have its own [[#Operator functions]] and will be identified by key:

- `+`: [[#Add]] two numbers
- `-` [[#Subtract]] two numbers
- `*` [[#Multiply]] two numbers
- `/` [[#Divide]]two numbers
- `=` [[#Total]] of the running operation

The operator, when entered, will call the correct key function passing values `a` and `b` and return the result to [[#Number Handling]]

```js
// syntax
function operatorHandler(a, b, operator) {
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
    case "=":
      return total(a, b);
      break;
  }
}
```

#### Display Handling

The display will be a div of its own that holds text values of mathematical data. It recieves data and displays it in `display.textContent`. If a person enters an operator, they will want to be adding whatever was previously in the display to whatever they enter next. This is handled in number handling, so we only need to worry about displaying the current total. We can however store the previous total in a hidden div so that if someone enters a series of number + operator + number + operator + ... characters, we can store the value in a global variable so we can maintain state as long as the user doesn't refresh the screen. 

The display object will have the following methods:
- set()
- get()
- clear()

##### Display

```js
//syntax
// here RUNNING_TOTAL is a global variable to maintain state
let RUNNING_TOTAL;
const display = {
  // method to set the value of the display
  set(value) {
    // if no value, set 0
    value = value || 0;
    const display = document.getElementByID("display");
    RUNNING_TOTAL = display.textContent;
  },
  // method to get the value of the display
  get() {
    return document.getElementByID("display").textContent;
  },
  // method to clear the screen
  clear() {
    if (operator == "C") {
      display.textContent = "";
      RUNNING_TOTAL = 0;
    } else {
      display.textContent(value);
    }
  },
};
```

#### Specials Handling

Special keys are currently "C", "Escape", "Backspace", "Delete".

- Escape: This will clear the display and dump the value of the global RUNNING_TOTAL to 0, effectively clearing state.
- C: Same as escape
- Backspace: remove one character from the rightmost end of the number string
- Delete: delete the entire number string and repopulate with the previous value

```js
//syntax
function specialHandler(key){
  switch(key):
    case ("C" || "Escape"):
      display.set("C");
      break;
    case "Backspace":

      break;
    case "Delete":
      break;
}
```

#### Animation Handling

### Operator functions

#### Add

Recieves two numbers, a & b, sums them and returns the value

```js
//syntax
function add(a, b) {
  return a + b;
}
```

#### Subtract

Recieves two numbers, a & b, subtracts them and returns the value

```js
//syntax
function add(a, b) {
  return a - b;
}
```

#### Multiply

Recieves two numbers, a & b, multiplies them and returns the value

```js
//syntax
function add(a, b) {
  return a * b;
}
```

#### Divide

Recieves two numbers, a & b, divides them and returns the value

```js
//syntax
function add(a, b) {
  return a / b;
}
```

#### Total

Total is a special case. It takes the RUNNING_TOTAL and current display and performs the operation called on them, then clears RUNNING_TOTAL and leaves the displayed total value up.
