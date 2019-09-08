/*
 * Primary file for API
 *
 */

// Dependencies
const server = require("./lib/server");

// Instantiate the App class
class App {
  // Init script
  init() {
    // Start the server
    server.init();
  }
}

// Instance of the App
const app = new App();

// Self executing
app.init();
