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
- CSScomb CSS, Minify CSS and JavaScript

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
Production task that runs the build task, CSScomb’s the CSS, then minifies the CSS and JavaScript

If you’re using Grunt, just replace `gulp` with `grunt` in the above tasks:
```
grunt
grunt build
grunt dist
```

## Notes

- Point your browser to `localhost:3000` and make a change to a Sass file to see Browsersync in action.
- To add or remove concatenated JS files, look in lines 62 and 63 of `gulpfile.js` (or 80 and 81 of `Gruntfile.js`).
- Config files (`.csscomb.dist.json`, `.editorconfig`, `.eslintrc`, `bs-config.js` and `config.postcss.json`) are shared by gulp and Grunt.
- Browsersync’s config file `bs-config.js` is configured to serve from the root directory (`./`) and refresh CSS changes. More details on [configuring Browsersync](https://www.browsersync.io/docs/options/).
- CSScomb’s config file `.csscomb.dist.json` is configured for production (`dist` tasks). If you are planning on using CSScomb during development (or) to enforce CSS/Sass formatting, you should create a `.csscomb.json` in the root of your project and configure it accordingly (this will not affect the `dist` tasks since they are specifically looking for the `.csscomb.dist.json` file). More details on [configuring CSScomb](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md).
- ESLint’s config file `.eslintrc` is configured to use the `eslint:recommended` configuration, and is slightly extended. More details on [configuring ESLint](http://eslint.org/docs/user-guide/configuring).
