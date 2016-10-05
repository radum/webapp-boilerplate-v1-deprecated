[![David Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/status.svg)](https://david-dm.org/radum/webapp-boilerplate) [![David Dev Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/dev-status.svg)](https://david-dm.org/radum/webapp-boilerplate?type=dev)

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [ES6 Web app boilerplate using Gulp + Browserify](#es6-web-app-boilerplate-using-gulp-browserify)
	- [Features](#features)
	- [libsass](#libsass)
	- [Getting Started](#getting-started)
		- [Run with Docker](#run-with-docker)
		- [Tasks](#tasks)
		- [Gulp plugins](#gulp-plugins)
		- [Browserify & ES6 modules](#browserify-es6-modules)
	- [Node modules used](#node-modules-used)
	- [Contribute](#contribute)
	- [License](#license)

<!-- /TOC -->

# ES6 Web app boilerplate using Gulp + Browserify

This is heavily inspired by the [Yeoman generator-webapp](https://github.com/yeoman/generator-webapp) so most credit will go to the Yeoman team.

## Features

* Enable [ES2015 features](https://babeljs.io/docs/learn-es2015/) using [Babel](https://babeljs.io)
* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Automagically compile Sass with [libsass](http://libsass.org)
* Transform styles with [PostCSS](http://postcss.org/) & PostCSS plugins (see gulpfile)
* Automagically lint your scripts using Eslint (with the Airbnb config) and SCSSLint
* Automagically compiles your ES6 modules using Browserify
* Map compiled CSS/JS to source stylesheets/js with source maps
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io)

## libsass

Keep in mind that libsass is feature-wise not fully compatible with Ruby Sass. Check out [this](http://sass-compatibility.github.io) curated list of incompatibilities to find out which features are missing.

If your favorite feature is missing and you really need Ruby Sass, you can always switch to [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass) and update the `styles` task in gulpfile accordingly.

## Getting Started

- Clone this repo
- Install npm and bower dependencies: `npm install; bower install`
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build

To start developing, run:

```
$ gulp serve
```

This will fire up a local web server, open http://localhost:9000 in your default browser and watch files for changes, reloading the browser automatically via [BrowserSync](https://www.browsersync.io/).

To run the tests in the browser, run:

```
$ gulp serve:test
```

To make a production-ready build of the app, run:

```
$ gulp
```

To preview the production-ready build to check if everything is ok:

```
$ gulp serve:dist
```

### Run with Docker

If you don't want to install Node, npm and all its friends you can run this using [Docker](https://www.docker.com/).

Build the docker image using `docker-compose`

```
$ docker-compose -f docker-compose-development.yml build
```

Then all you need is to run a container based on the previously created image

```
$ docker-compose -f docker-compose-development.yml up
```

This will start a docker container with the previously built image and it will run `npm run start` script that in its turn will run `gulp serve`.

### Tasks

To get the list of available tasks, run:

```
$ gulp --tasks
```

### Gulp plugins

As you might have noticed, gulp plugins (the ones that begin with gulp-) don't have to be require()'d. They are automatically picked up by [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins) and available through the $ variable.

### Browserify & ES6 modules

While Babel will transpile your code back to ES6 Browserify will bundle your modules into one single file `main.build.js` that is referenced in the main index.html file. Also when building the dist version on top of uglify, I run rollupify also to make the file as small as possible.

The starting point for browserify will be the `main.js` file.

## Node modules used

Bellow is the entire list of node modules used and a short description on how they are used or what they do.

```
"babel-core"                      # Babel compiler core. (This is already pard of babelify, should be removed)

"babel-plugin-transform-runtime"  # Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals.
"babel-runtime"                   # Also used for features such as generators. https://babeljs.io/docs/plugins/transform-runtime/

"babel-preset-es2015"             # Babel preset for all es2015 plugins. Transforms ES6 to ES5
"babelify"                        # Babel browserify transform. browserify uses this to transform the code with babel before bundle
"browser-sync"                    # Keep multiple browsers & devices in sync when building websites
"browserify"                      # Browser-side require() the node way
"chalk"                           # Terminal string styling done right
"del"                             # Delete files and folders. Used in our gulpfile to clear build and tmp folders
"eslint"                          # Used to lint JS code
"eslint-config-airbnb"            # Eslint Airbnb config
"eslint-formatter-pretty"         # Pretty ESLint formatter, prduces nicer reports in the console
"eslint-plugin-import"            # This plugin intends to support linting of ES2015+ (ES6+) import/export syntax. It loads itself automatically
"gulp"                            # The streaming build system used in this project
"gulp-autoprefixer"               # Prefix CSS using gulp. This should be removed and use PostCSS instead
"gulp-cache"                      # A cache proxy plugin for Gulp. Used by `images` task to cache minified images
"gulp-cssnano"                    # Minify CSS with cssnano
"gulp-duration"                   # Track the duration of parts of your gulp tasks
"gulp-eslint"                     # A gulp plugin for processing files with ESLint
"gulp-htmlmin"                    # Gulp plugin to minify HTML
"gulp-if"                         # Conditionally run a task
"gulp-imagemin"                   # Minify PNG, JPEG, GIF and SVG images
"gulp-load-plugins"               # Automatically load any gulp plugins in your package.json
"gulp-notify"                     # Gulp plugin to send messages based on Vinyl Files or Errors to Mac OS X, Linux or Windows
"gulp-plumber"                    # Prevent pipe breaking caused by errors from gulp plugins. Used in styles and scripts tasks
"gulp-postcss"                    # PostCSS gulp plugin
"gulp-sass"                       # Gulp plugin for sass
"gulp-size"                       # Display the size of your project
"gulp-sourcemaps"                 # Source map support for Gulp.js
"gulp-stylelint"                  # Gulp plugin for running Stylelint results through various reporters
"gulp-uglify"                     # Minify files with UglifyJS
"gulp-useref"                     # Parse build blocks in HTML files to replace references to non-optimized scripts or stylesheets (<!-- build: block in html).
"gulp-util"                       # Utility functions for gulp plugins
"main-bower-files"                # Get main files from your installed bower packages. Used by the gulp fonts task to take all font files from bower deps
"pixrem"                          # A CSS post-processor that generates pixel fallbacks for rem units
"postcss-custom-properties"       # PostCSS plugin to polyfill W3C CSS Custom Properties for cascading variables (you can use `var()` in CSS)
"postcss-flexbugs-fixes"          # PostCSS plugin This project tries to fix all of flexbug's issues
"postcss-reporter"                # Log PostCSS messages in the console
"postcss-scss"                    # SCSS parser for PostCSS, used in gulpfile.js
"rollupify"                       # Browserify transform to apply Rollup
"sass-mq"                         # mq() is a Sass mixin that helps manipulating media queries in an elegant way, used for responsive design
"stylelint-scss"                  # A collection of SCSS specific linting rules for stylelint (in a form of a plugin). Used in .stylelintrc as a plugin
"vinyl-buffer"                    # Convert streaming vinyl files to use buffers. Used with browserify to convert to gulp pipeline so we can pipe it
"vinyl-source-stream"             # Use conventional text streams at the start of vinyl pipelines. Used by browserify to set the source name js file
"wiredep"                         # Wires Bower dependencies to your source code
```

## Contribute

See the [contributing docs](CONTRIBUTING.md).

## License

[MIT](https://opensource.org/licenses/MIT) © Radu Micu
