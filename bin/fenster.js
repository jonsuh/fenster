#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const colors = {
  "red"    : "\x1b[31m",
  "green"  : "\x1b[32m",
  "yellow" : "\x1b[33m",
  "blue"   : "\x1b[34m",
  "magenta": "\x1b[35m",
  "cyan"   : "\x1b[36m",
  "default": "\x1b[0m"
};


// Check if package.json exists
// Create file if false exist
if (! fs.existsSync("package.json")) {
  try {
    console.log(colors.yellow, "!", colors.default, "package.json doesn’t exist. One has been created.");
    fs.writeFileSync("package.json", "{}", "utf8");
  }
  catch(error) {
    console.log(error);
    process.exit(1);
  }
}


// Try to get and validate package.json
try {
  try {
    JSON.parse(fs.readFileSync("package.json", "utf8"));
  }
  catch(error) {
    console.log(colors.red, "✘", colors.default, "Invalid JSON in package.json");
    process.exit(1);
  }
}
catch(error) {
  console.log(error);
  process.exit(1);
}


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
          copyFile("bin/src/Gruntfile.js", "Gruntfile.js");
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


// Check if devDependencies key exists is an object
if (packageFile.devDependencies === undefined || typeof(packageFile.devDependencies !== "object")) {
  packageFile.devDependencies = {};
}
// Add or update devDependencies of package.json with package.type.json
for (let key in typeFile.devDependencies) {
  packageFile.devDependencies[key] = typeFile.devDependencies[key];
}

// Check if scripts key exists is an object
if (packageFile.scripts === undefined || typeof(packageFile.scripts !== "object")) {
  packageFile.scripts = {};
}
// Add or update scripts of package.json with package.type.json
for (let script in typeFile.scripts) {
  packageFile.scripts[script] = typeFile.scripts[script];
}


// Write the new contents to package.json
try {
  fs.writeFile("package.json", JSON.stringify(packageFile, null, 2));

  let message = colors.cyan + "package.json" + colors.default + " has been updated to include " + type + " devDependencies";

  if (type === "yarn" || type === "npm") {
    message += " and scripts";
  }

  message += ".";
  console.log(colors.green, "✔", colors.default, message);

  if (type === "gulp" || type === "grunt") {
    if (type === "grunt") {
      type = "Grunt";
    }
    message = colors.magenta + type + "file.js" + colors.default + " has been created in the root directory.";
    console.log(colors.green, "✔", colors.default, message);
  }

  message = "Don’t forget to run " + colors.yellow + "yarn" + colors.default + " or " + colors.yellow + "npm install" + colors.default + ". Otherwise, you’re good to go!";
  console.log(colors.green, "🚀", colors.default, message);
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
