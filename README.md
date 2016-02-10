# gulp/Grunt Starter

gulp/Grunt Starter is designed to quickly get a front-end development environment up-and-running.

gulp is the default setup, but if you prefer to use Grunt, you can! (more information on using Grunt in [Installation](#installation)).

## Setup

Here’s what I have set up:

- Sass
- Autoprefixer
- ESLint
- Concatenate JavaScript
- Sourcemaps
- Watch and rebuild Sass and JavaScript
- Browsersync
- Minify CSS and JavaScript

## Installation

*__Note__: If you want to use Grunt instead of gulp, replace `package.json` with `package.grunt.json` (discard the original `package.json` or rename it to `package.gulp.json`).*

1. Be sure you have [Node.js](https://nodejs.org) installed
2. Clone this repo (`git clone git@github.com:jonsuh/gulp-grunt-starter.git`) or download and unzip
3. `cd` to the repo directory (e.g. `cd ~/repos/gulp-grunt-starter`)
4. Run `npm install` (you may have to run it with sudo: `sudo npm install`)

You’re ready to roll!

To test it out, run `gulp` (or `grunt`), point your browser to `localhost:3000`, and make changes to a Sass or JS file, and watch gulp/Grunt work. 

## Tasks

- `gulp`  
Default, development task that runs the build task, then watches for changes and enables Browsersync.

- `gulp build`  
Build task that autoprefixes and compiles Sass to CSS, lints and concatenates JavaScript.

- `gulp dist`  
Production task that runs the build task, then minifies the CSS and JavaScript

If you’re using Grunt, just replace `gulp` with `grunt` in the above tasks:
```
grunt
grunt build
grunt dist
```

## Notes

- Point your browser to `localhost:3000` and make a change to a Sass file to see Browsersync in action.
- Browsersync is configured to only refresh CSS changes.
- To add or remove concatenated JS files, look in lines 71 and 72 of `gulpfile.js` (or 67 and 68 of `Gruntfile.js`).
- ESLint config file is `.eslintrc`, which is respected by gulp and Grunt.
