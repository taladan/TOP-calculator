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

/* tests for return values is expected */
console.log(operate("+", 5, 2));
console.log(operate("-", 5, 2));
console.log(operate("*", 5, 2));
console.log(operate("/", 5, 2));
