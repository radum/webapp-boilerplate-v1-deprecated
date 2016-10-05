[![David Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/status.svg)](https://david-dm.org/radum/webapp-boilerplate) [![David Dev Dependency Badge](https://david-dm.org/radum/webapp-boilerplate/dev-status.svg)](https://david-dm.org/radum/webapp-boilerplate?type=dev)

# ES6 Web app boilerplate using Gulp + Browserify

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
* Awesome image optimization
* Automagically wire-up dependencies installed with [Bower](http://bower.io) via [wiredep](https://github.com/taptapship/wiredep)
* Development using Docker if needed
* inuitcss + BEM + SuitCSS architecture and CSS structure

*For more information on what this can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in our `package.json`.* or read the docs

## Getting Started

**Step 1.** Make sure that you have Node.js installed on your machine.

**Step 2.** Clone this repository or use Yeoman generator to bootstrap your project:

```
$ git clone -o webapp-boilerplate -b master --single-branch \
      https://github.com/radum/webapp-boilerplate.git MyApp
$ cd MyApp
$ npm install                   # Install project dependencies listed in package.json
$ bower install                 # Install project dependencies listed in bower.json
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
$ gulp serve:test               # Run unit tests
```

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

This is heavily inspired by the [Yeoman generator-webapp](https://github.com/yeoman/generator-webapp) so most credit will go to the Yeoman team. Thank you all for the great work.

## License

Copyright © 2015-present Radu Micu. This source code is licensed under the [MIT license](https://opensource.org/licenses/MIT) © Radu Micu

---
Made with ♥ by RaduM ([@radumicu](http://twitter.com/radumicu))
