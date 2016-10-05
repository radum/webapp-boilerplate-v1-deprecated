# Documentation

## Recipes

Under [recipes](recipes) folder you can find various examples on how to extend this boilerplate.

## libsass

Keep in mind that libsass is feature-wise not fully compatible with Ruby Sass. Check out [this](http://sass-compatibility.github.io) curated list of incompatibilities to find out which features are missing.

If your favorite feature is missing and you really need Ruby Sass, you can always switch to [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass) and update the `styles` task in gulpfile accordingly.

## Gulp plugins

As you might have noticed, gulp plugins (the ones that begin with gulp-) don't have to be require()'d. They are automatically picked up by [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins) and available through the $ variable.

## Browserify & ES6 modules

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
