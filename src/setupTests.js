var util = require('util');
var consoleWarn = console.warn;
var consoleError = console.error;
function logToError() {
      throw new Error(util.format.apply(this, arguments).replace(/^Error: (?:Warning: )?/, ''));
}

jasmine.getEnv().beforeEach(function () {
      // make calls to console.warn and console.error throw an error
      console.warn = logToError;
      console.error = logToError;
});

jasmine.getEnv().afterEach(function () {
      // return console.warn and console.error to default behaviour
      console.warn = consoleWarn;
      console.error = consoleError;
});