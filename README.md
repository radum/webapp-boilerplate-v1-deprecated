[![David Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/dev-status.svg)](https://david-dm.org/radum/webapp-boilerplate/#info=devDependencies)

# ES6 Web app boilerplate using Gulp + Browserify

This is heavily inspired by the [Yeoman generator-webapp](https://github.com/yeoman/generator-webapp) so most credit will go to the Yeoman team.

## Features

* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Automagically compile Sass with [libsass](http://libsass.org)
* Automagically lint your scripts using Eslint (with the Airbnb config) and SCSSLint
* Automagically compiles your ES6 modules using Browserify
* Map compiled CSS/JS to source stylesheets/js with source maps
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io)
* The gulpfile makes use of [ES2015 features](https://babeljs.io/docs/learn-es2015/) by using [Babel](https://babeljs.io)

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

## Contribute

See the [contributing docs](CONTRIBUTING.md).

## License

[MIT](https://opensource.org/licenses/MIT) © Radu Micu
