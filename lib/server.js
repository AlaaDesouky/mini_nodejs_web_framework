/*
 * Server-related tasks
 *
 */

// Dependencies
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const helpers = require("./helpers");
const config = require("./config");

// Instantiate the Server class
class Server {
  constructor() {
    // Instantiate the HTTP server
    this.httpServer = http.createServer((req, res) =>
      this.unifiedServer(req, res)
    );

    // Instantiate the HTTPs server
    this.httpsServerOptions = {
      key: fs.readFileSync(path.resolve(__dirname, "..", "https", "key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "..", "https", "cert.pem"))
    };
    this.httpsServer = https.createServer(this.httpsServerOptions, (req, res) =>
      this.unifiedServer(req, res)
    );
  }

  // All the server logic for both the http and https server
  unifiedServer(req, res) {
    // Parse the url for pathname and querystring
    const parsedUrl = url.parse(req.url, true);

    //Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");

    // Get the querystring as an object
    const queryStringObject = parsedUrl.query;

    // Get the method
    const method = req.method.toLowerCase();

    // Get the headers
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder("utf-8");

    // Store the stream of data
    let payload = "";
    req.on("data", data => {
      payload += decoder.write(data);
    });

    req.on("end", () => {
      payload += decoder.end();

      // Construct the data object
      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        payload: helpers.parseJsonToObject(payload)
      };

      console.log(data);
    });
  }

  // Init script
  init() {
    // Start the HTTP server
    this.httpServer.listen(config.httpPort, () =>
      console.log(
        "\x1b[36m%s\x1b[0m",
        `The HTTP server is running on port ${config.httpPort}`
      )
    );

    // Start the HTTPS server
    this.httpsServer.listen(config.httpsPort, () =>
      console.log(
        "\x1b[35m%s\x1b[0m",
        `The HTTPS server is running on port ${config.httpsPort}`
      )
    );
  }
}

// Export the module
module.exports = new Server();
