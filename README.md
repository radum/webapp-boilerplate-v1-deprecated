[![David Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/status.svg)](https://david-dm.org/radum/webapp-boilerplate) [![David Dev Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/dev-status.svg)](https://david-dm.org/radum/webapp-boilerplate?type=dev)

# ES6 Web app boilerplate using Gulp 4 + Browserify

> Scaffold out a front-end web app using [gulp](http://gulpjs.com/) for the build process.

## Features

* Enable [ES2015 features](https://babeljs.io/docs/learn-es2015/) using [Babel](https://babeljs.io)
* CSS Autoprefixing
* Built-in preview server with [BrowserSync](https://www.browsersync.io/)
* Automagically compile Sass with [libsass](http://libsass.org)
* Transform styles with [PostCSS](http://postcss.org/) & PostCSS plugins (see gulpfile)
* Automagically lint your scripts using [Eslint](http://eslint.org/) (with the Airbnb config) and [Stylelint](http://stylelint.io/)
* Automagically compiles your ES6 modules using Browserify
* Map compiled CSS/JS to source stylesheets/js with source maps
* Awesome image optimization via [imagemin](https://github.com/imagemin/imagemin)
* Development using Docker if needed
* CSS architecture and CSS structure inspired and mostly copied from [inuitcss](https://github.com/inuitcss/inuitcss), [BEM](http://getbem.com/), [SuitCSS](https://github.com/suitcss)

*For more information on what this can do for you, take a look at the [gulp plugins](package.json) used in our `package.json`.* or read the docs

## Getting Started

**Step 1.** Make sure that you have Node.js installed on your machine.

**Step 2.** Clone this repository or use [Yeoman generator](https://github.com/radum/webapp-boilerplate/tree/generator-webapp-boilerplate) to bootstrap your project:

```
$ git clone -o webapp-boilerplate -b master --single-branch \
      https://github.com/radum/webapp-boilerplate.git MyApp
$ cd MyApp
$ npm install                   # Install project dependencies listed in package.json
$ bower install                 # Install project dependencies listed in bower.json
```

<p align="center">——— or ———</p>

```
$ npm install -g yo
$ npm install -g generator-webapp-boilerplate
$ mkdir MyApp
$ cd MyApp
$ yo webapp-boilerplate
```

**Step 3.** Compile and launch your app by running:

```
$ npm start                      # Same as `gulp serve`
```

This will fire up a local web server, open http://localhost:9000 in your default browser and watch files for changes, reloading the browser automatically via [BrowserSync](https://www.browsersync.io/).

## How to test

The unit tests are powered by chai and mocha.

```
$ gulp lint                     # Lint script files
$ gulp lint-css                 # Lint styles
$ npm run lint                  # Runs the previous lint task

$ gulp serve:test               # Run unit tests
```

## Linting

ESLint is used for linting JavaScript code. A `.eslintrc.json` file is already provided but you can define rules in your `package.json` under the `"eslint"` field also.

### The `no-undef` rule and tests

The ESLint rule [`no-undef`] will warn about usage of explicitly undeclared variables and functions. Because our tests use global functions like `describe` and `it` (defined by the testing framework), ESLint will consider those as warnings.

Luckily, the fix is easy—add an `.eslintrc.json` file to the `test/spec` directory and let ESLint know about your testing framework. For example, if you're using Mocha, add this to `.eslintrc.json`:

```json
{
  "env": {
    "mocha": true
  }
}
```

Configuration from this `.eslintrc.json` will merge with your project-wide configuration.

## How to build a distribution

To make a production-ready build of the app, run:

```
$ gulp
$ gulp serve:dist               # To preview the production build
```

## Docs

For more information see the [docs](docs) folder.

### Run with Docker

If you don't want to install Node, npm and all its friends you can run this using [Docker](https://www.docker.com/).

Build the docker image using `docker-compose`

```
$ docker-compose -f docker-compose-development.yml build
```

Then run a container based on the previously created image

```
$ docker-compose -f docker-compose-development.yml up
```

This will start a docker container with the previously built image and it will run `npm run start`.

### Tasks

To get the list of available Gulp tasks, run:

```
$ gulp --tasks
```

## How to Contribute

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md) to this project. The best way to start is by checking current [open issues](https://github.com/radum/webapp-boilerplate/issues), submit a new issues or feature request, participate in discussions, upvote or downvote the issues you like or dislike, send pull requests.

## Credits

This is heavily inspired by the [Yeoman generator-webapp](https://github.com/yeoman/generator-webapp) so most credit will go to the Yeoman team and by [inuitcss](https://github.com/inuitcss/inuitcss). Thank you all for the great work you have done so far.

Also thanks to Joe Zim for his [migration tutorial](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/) to Gulp 4

## License

Copyright © 2015-present Radu Micu. This source code is licensed under the [MIT license](https://opensource.org/licenses/MIT) © Radu Micu

---
Made with ♥ by RaduM ([@radumicu](http://twitter.com/radumicu))
