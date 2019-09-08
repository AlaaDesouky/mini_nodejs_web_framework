/*
 * Server-related tasks
 *
 */

// Dependencies
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
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
    console.log("Testing server");
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

module.exports = new Server();
