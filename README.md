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

To be able to catch keyboard numbers and operators that are in the calculator container there has to be a `window.addEventListener` that is listening for key presses.

### Containers

The calculator container should also have four seperate containers within it:

1. A display container that has the current value being entered/operated on and/or the totalled value
2. A specials conatiner that has special buttons (C, Backspace) the specials should be below the display
3. A numbers container that just has numeric buttons (0-9 and .) The buttons should be below the specials
4. An operators container that just has operator buttons (+, -, \*, /) The operators should be to the right of the buttons

### Data Store
So, in discussing some of the thickets of weeds that I keep running into, @wavE suggested I look at doing something like this:  Push each number and operator entered into an array.  When calling `=` you should just take the last three values from the array and run that operation.  This actually would work for all operations if we only worry about ever pulling the last three values from the array.  If we do:
`10 - 5`, we parse the array values and push the total onto the array as the array[0], then clear array[1] and array[2].  That way, array[0] always acts as our running total, array[1] acts as our operator store and array[3] acts as our last entered number.

So, what should handle pushing numbers onto our array?  The event handler, as we are working with changing values of stuff, that's event-ish.  pushing to display is also eventish, so any time we change the display, we'll want the eventhanderl to update that.


### Event logic

There will be three event listeners on the window:

- keydown events to run keyHandler
- keydown event to run addAnimation
- keyup event to run remove

There will be one event listener on the calculator container:
- click events to run mouseHandler

The mouse click on the buttons will be styled the same as the animation for the keys via mouse:active

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
window.addEventListener("keydown", addAnimation);
window.addEventListener("keyup", removeAnimation);

const calculator = document.getElementById("container");
calculator.addEventListener("click", mouseHandler);
```

#### Event handlers

##### Key Handler

When a key is pressed, it's captured and sent to `keyHandler`. We are listening for values that exist within the scope of the body of the calculator. To have something to match against, we need an array of all the values from the document's buttons. 

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
Determine if button pressed is a number, operator, or special and call the appropriate function, if it's not any of these, do nothing

```js
// syntax

function keyHandler(event){
  let key = event.key;
  eventHandler(key);
  };
};
```

##### Mouse Handler
The mouse handler takes care of seeing if the mouse has clicked on a button in the body of the calculator.  The functionality of a mouse click should be identical to the functionality of a key press with regards to inputting numbers, operators, and special keys.

```js
// syntax

function mouseHandler(event) {
  let key = event.target.textContent;
  eventHandler(key);
}
```

##### Event Handler

```js
const CALCULATION_ARRAY = []
function eventHandler(key){
  switch key{
    case numberButtons.includes(key):
	  let numberArray = numberHandler.add(key);
	  display.set(numberArray);
	  break;
	case operatorButtons.includes(key):
	  display.set(operatorHandler(key));
	  break;
	case specialButtons.includes(key):
	  specialHandler(key);
	  break;
	default:
	  // not a valid button, do nothing
  }
}
```

##### Animation Handler

```js
	// syntax

function addAnimation() {}
```

### Needed functions

#### Number Handling

Numbers will be entered one at a time as strings, building a total 'number' that some operation is to be done on. For handling the numbers, we will be using an array that accumulates each string 'digit' that is entered. Decimal numbers should be handled sanely. String digits are pushed to an array as they are entered. The number handler will need its own methods:
- add() - to add a character and return the string for display
- remove() - to remove a character from the rightmost position and return the string for display

```js
// syntax
let STRING_DIGITS_ARRAY = [];
const numberHandler = add(char) {
  if (char === "." && STRING_DIGITS_ARRAY.includes(char)) {
    return STRING_DIGITS_ARRAY.join("");
  } else {
    STRING_DIGITS_ARRAY.push(s);
    return STRING_DIGITS_ARRAY.join("");
  },
  remove(){
    if (display.get > 0){
      return display.get.substring(0, display.get.length - 1);
    }
  }
}
```

#### Operator Handling

First convert the two number strings created in [[#Number Handling]] to floats
Each operator will have its own [[#Operator functions]] and will be identified by key:

- `+`: [[#Add]] two numbers
- `-` [[#Subtract]] two numbers
- `*` [[#Multiply]] two numbers
- `/` [[#Divide]] two numbers
- `=` [[#Total]] of the running operation

The operator, when entered, will call the correct key function passing values `a` and `b` and return the result to [[#Number Handling]]

```js
// syntax
let PREVIOUS_OPERATION = ""
function operatorHandler(operator) {
  const a = CALCULATION_ARRAY||0;
  const b = display.get;
  switch (operator) {
    case "+":
	  PREVIOUS_OPERATION = operator;
      return add(a, b);
      break;
    case "-":
	  PREVIOUS_OPERATION = operator;
      return subtract(a, b);
      break;
    case "*":
	  PREVIOUS_OPERATION = operator;
      return multiply(a, b);
      break;
    case "/":
	  PREVIOUS_OPERATION = operator;
      return divide(a, b);
      break;
    case "=":
	  PREVIOUS_OPERATION = "";
      return total(PREVIOUS_OPERATION,a, b);
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
// here CALCULATION_ARRAY is a global variable to maintain state
let CALCULATION_ARRAY;
const display = {
  // method to set the value of the display
  set(value) {
    // if no value, set 0
    value = value || 0;
    const display = document.getElementByID("display");
    CALCULATION_ARRAY = display.textContent;
  },
  // method to get the value of the display
  get() {
    return document.getElementByID("display").textContent;
  },
  // method to clear the screen
  clear() {
      display.textContent = "";
      CALCULATION_ARRAY = 0;
  },
};
```

#### Specials Handling

Special keys are currently "C", "Escape", "Backspace", "Delete".

- Escape: This will clear the display and dump the value of the global CALCULATION_ARRAY to 0, effectively clearing state.
- C: Same as escape
- Backspace: remove one character from the rightmost end of the number string

```js
//syntax
function specialHandler(key){
  switch(key):
    case ("C" || "Escape"):
      display.set("C");
      break;
    case "Backspace":
	  numberHandler.remove();
      break;
}
```

#### Animation Handling
Animation handling will be done by CSS: 
- On keydown we add the class `animate` to the button, the class will be styled by the css.
- On keyup we remove the class `animate` from the button, the class will be styled by the css.

```js
function addAnimation(event){
  let target = event.target;
  target.classList.add("animate");
}

function removeAnimation(event){
  let target = event.target;
  target.classList.remove("animate");
}
```

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