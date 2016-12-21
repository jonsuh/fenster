#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

let packageFile = require("../package.json");

const typeDefault = "yarn";
let type          = typeDefault;


// Try to get value of --type flag
const args = process.argv.slice(2);
const flag = args[0];

if (flag === "-t" || flag === "--type") {
  if (args[1] !== undefined) {
    type = args[1].toLowerCase();

    if (type === "npm" || type === "gulp" || type === "grunt") {
      switch(type) {
        case "gulp":
          // copy gulpfile.js
          copyFile("bin/src/gulpfile.js", "gulpfile.js");
          break;
        case "grunt":
          // copy Gruntfile.js
          break;
      }
    }
    else {
      type = typeDefault;
    }
  }
}


// Read the contents of package.type.json
let typeFile;

try {
  typeFile = fs.readFileSync("bin/src/package." + type + ".json", "utf8");
}
catch(error) {
  console.log(error);
  process.exit(1);
}

typeFile = JSON.parse(typeFile);


// Replace the devDependencies and scripts contents of package.json with package.type.json
packageFile.devDependencies = typeFile.devDependencies;
packageFile.scripts         = typeFile.scripts;


// Write the new contents to package.json
try {
  fs.writeFile("package.json", JSON.stringify(packageFile, null, 2));
}
catch(error) {
  if (error) {
    console.log(error);
    process.exit(1);
  }
}


// Copy file function
function copyFile(source, dest) {
  fs.open(source, "r", function(error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    else {
      fs.createReadStream(source)
        .pipe(fs.createWriteStream(dest));
    }
  });
}
