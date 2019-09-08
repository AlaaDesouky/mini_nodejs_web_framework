/*
 * Library for storing and editing data
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

// Instantiate the Data class
class Data {
  constructor() {
    // Base directory of data folder
    this.baseDir = path.resolve(__dirname, "..", ".data");
  }

  // Write data to a file
  create(dir, file, data) {
    return new Promise((resolve, reject) => {
      // Open the file for writing
      fs.open(
        path.resolve(this.baseDir, dir, `${file}.json`),
        "wx",
        (err, fileDescriptor) => {
          if (!err && fileDescriptor) {
            // Convert data to string
            let stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, err => {
              if (!err) {
                fs.close(fileDescriptor, err => {
                  if (!err) {
                    resolve("File created successfully");
                  } else {
                    reject("Error closing new file");
                  }
                });
              } else {
                reject("Error writing to new file");
              }
            });
          } else {
            reject("Could not create new file, it may already exist");
          }
        }
      );
    });
  }

  // Read data from a file
  read(dir, file) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(this.baseDir, dir, `${file}.json`),
        "utf8",
        (err, data) => {
          if (!err && data) {
            let parsedData = helpers.parseJsonToObject(data);
            resolve(parsedData);
          } else {
            reject("Error reading from file");
          }
        }
      );
    });
  }

  // Updata data in a file
  update(dir, file, data) {
    return new Promise((resolve, reject) => {
      // Open the file for writing
      fs.open(
        path.resolve(this.baseDir, dir, `${file}.json`),
        "r+",
        (err, fileDescriptor) => {
          if (!err && fileDescriptor) {
            // Convert data to string
            let stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(
              path.resolve(this.baseDir, dir, `${file}.json`),
              stringData,
              err => {
                if (!err) {
                  resolve("File updated successfully");
                } else {
                  reject("Error writing to existing file");
                }
              }
            );
          } else {
            reject("Could not open file for updateing, it may not exist yet");
          }
        }
      );
    });
  }

  // Delete a file
  delete(dir, file) {
    return new Promise((resolve, reject) => {
      fs.unlink(path.resolve(this.baseDir, dir, `${file}.json`), err => {
        if (!err) {
          resolve("File deleted successfully");
        } else {
          reject("Error deleting file");
        }
      });
    });
  }

  // List all the items in a directory
  list(dir) {
    return new Promise((resolve, reject) => {
      fs.readdir(path.resolve(this.baseDir, dir), (err, data) => {
        if (!err && data && data.length > 0) {
          // Trim file extention
          let trimmedFileNames = [];
          data.forEach(fileName => {
            trimmedFileNames = [
              ...trimmedFileNames,
              fileName.replace(".json", "")
            ];
          });
          resolve(trimmedFileNames);
        } else {
          reject("Error listing files in the directory");
        }
      });
    });
  }
}

// Export the module
module.exports = new Data();
