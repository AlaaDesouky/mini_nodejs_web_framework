/*
 * Config and handle routes
 *
 */

// Dependencies
const usersRoutes = require("./_users.routes");

// Instantiate the Handler class
class Handlers {
  constructor(response) {
    this.users = this.init.bind(this, usersRoutes);

    this.response = response;
  }

  // Initialize routes
  init(handler, data) {
    return new Promise((resolve, reject) => {
      // Check if the method exists on the handler
      if (Object.keys(handler.acceptableMethods).indexOf(data.method) > -1) {
        this.response = handler.acceptableMethods[data.method](data);
      } else {
        this.response = {
          statusCode: 405,
          payload: { Error: "Method not allowed" }
        };
      }
      resolve(this.response);
    });
  }
}

// Export the module
module.exports = new Handlers();
