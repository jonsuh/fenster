#! /usr/bin/env node
const fs = require("fs");
const path = require("path");


// Check if package.json exists
// Create file if false exist
if (! fs.existsSync("package.json")) {
  try {
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
    console.log("Error Invalid JSON in package.json");
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


// Add or update devDependencies of package.json with package.type.json
packageFile.devDependencies = typeFile.devDependencies;

for (let key in typeFile.devDependencies) {
  packageFile.devDependencies[key] = typeFile.devDependencies[key];
}

// Add or update scripts of package.json with package.type.json
packageFile.scripts = typeFile.scripts;

for (let script in typeFile.scripts) {
  packageFile.scripts[script] = typeFile.scripts[script];
}


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
