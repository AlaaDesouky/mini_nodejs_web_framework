/*
 * Helpers for various tasks
 *
 */

// Dependencies

// Instantiate the helpers class
class Helpers {
  // Parse a JSON string to an object in all cases, without throwing
  parseJsonToObject(str) {
    try {
      let obj = JSON.parse(str);
      return obj;
    } catch (e) {
      return {};
    }
  }
}

// Export the module
module.exports = new Helpers();
