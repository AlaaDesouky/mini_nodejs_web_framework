/*
 * Config and handle Users routes
 *
 */

// Dependencies

// Instantiate the User class
class Users {
  constructor(response) {
    this.acceptableMethods = {
      post: this.post,
      get: this.get,
      put: this.put,
      delete: this.delete
    };

    this.response = response;
  }

  post(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.response = {
        statusCode: 200,
        payload: { Response: "POST method found" }
      };
      resolve(this.response);
    });
  }

  get(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.response = {
        statusCode: 200,
        payload: { Response: "GET method found" }
      };
      resolve(this.response);
    });
  }

  put(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.response = {
        statusCode: 200,
        payload: { Response: "PUT method found" }
      };
      resolve(this.response);
    });
  }

  delete(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.response = {
        statusCode: 200,
        payload: { Response: "Delete method found" }
      };
      resolve(this.response);
    });
  }
}

// Export the module
module.exports = new Users();
