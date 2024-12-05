#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const directoryPath = path.join(process.cwd(), "_changeset");

// Read the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error("Unable to scan directory: " + err);
  }

  // Filter .md files
  files
    .filter((file) => path.extname(file) === ".md")
    .forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Read each file
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return console.error("Unable to read file: " + err);
        }

        // Replace '": minor' and '": major' with '": patch'
        const updatedData = data.replace(/": minor|": major/g, '": patch');

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, "utf8", (err) => {
          if (err) {
            return console.error("Unable to write file: " + err);
          }
          console.log(`File updated: ${file}`);
        });
      });
    });
});
