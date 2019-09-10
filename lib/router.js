/*
 * Config and handle routes
 *
 */

// Dependencies

// Instantiate the Router class
class Router {
  constructor() {
    // Instantiate the routes
    this.routes = {
      ping: this.ping
    };
  }

  router(data) {
    const route =
      typeof this.routes[data.trimmedPath] !== "undefined"
        ? this.routes[data.trimmedPath]
        : this.notFound;

    return new Promise(async (resolve, reject) => {
      let response = await route(data);
      let statusCode = 200;
      let payload = {};

      if (response !== undefined) {
        // Use the status code returned from the handler, or set the default status code to 200
        statusCode =
          response.statusCode !== undefined &&
          typeof response.statusCode === "number"
            ? response.statusCode
            : statusCode;

        // Use the payload returned from the handler, or set the default payload to an empty object
        payload =
          typeof response.payload === "object" ? response.payload : payload;
      } else {
        statusCode = 500;
        payload = { Error: "Server Error: Something went wrong" };
      }

      resolve({ statusCode, payload });
    });
  }

  ping() {
    return new Promise((resolve, reject) => {
      resolve({
        statusCode: 200,
        payload: { Response: "Server up and running" }
      });
    });
  }

  notFound() {
    return new Promise((resolve, reject) => {
      resolve({ statusCode: 404, payload: { Error: "404 Not Found" } });
    });
  }
}

// Export the module
module.exports = new Router();
