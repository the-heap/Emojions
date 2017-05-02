const sinon = require("sinon");

// Setting globals here will allow for access in any `*.test.js` file
global.sinon = sinon;

// Fail tests on any error
console.error = message => {
  throw new Error(message);
};
