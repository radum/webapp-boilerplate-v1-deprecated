[![David Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/dev-status.svg)](https://david-dm.org/radum/webapp-boilerplate/#info=devDependencies)

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [ES6 Web app boilerplate using Gulp + Browserify](#es6-web-app-boilerplate-using-gulp-browserify)
	- [Features](#features)
	- [libsass](#libsass)
	- [Getting Started](#getting-started)
		- [Run with Docker](#run-with-docker)
		- [Tasks](#tasks)
		- [Gulp plugins](#gulp-plugins)
		- [Browserify & ES6 modules](#browserify-es6-modules)
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

## Contribute

See the [contributing docs](CONTRIBUTING.md).

## License

[MIT](https://opensource.org/licenses/MIT) © Radu Micu
