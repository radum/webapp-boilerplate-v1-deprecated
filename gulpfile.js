const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync'); // Used to automaticaly refresh the browser
const del = require('del'); // Used for cleaning up the folders
const wiredep = require('wiredep').stream; // Used to inject bower components into index.html
const babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
const rollupify = require('rollupify'); // Used to tree shake the code
const browserify = require('browserify'); // Providers "require" support, CommonJS
const gulpStylelint = require('gulp-stylelint'); // Stylelint linter
const chalk = require('chalk'); // Allows for coloring for logging
const source = require('vinyl-source-stream'); // Vinyl stream support
const buffer = require('vinyl-buffer'); // Vinyl stream support
const prettyFormatter = require('eslint-formatter-pretty'); // ESlint log pretty format

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

GLOBAL.config = {
	env: 'prod',
	notify: true
};

GLOBAL.config.env = 'dev';

function mapError(err) {
	if (err.fileName) {
		// Regular error
		$.util.log(chalk.red(err.name)
		+ ': ' + chalk.yellow(err.fileName.replace(__dirname + 'app/scripts/', ''))
		+ ': ' + 'Line ' + chalk.magenta(err.lineNumber)
		+ ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
		+ ': ' + chalk.blue(err.description));
	} else {
		// Browserify error..
		$.util.log(chalk.red(err.name)
		+ ': '
		+ chalk.yellow(err.message));
	}
}

gulp.task('styles', () => {
	return gulp.src('app/styles/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.postcss([
			// W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
			// https://github.com/postcss/postcss-custom-properties
	  		require('postcss-custom-properties')(),
			// Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
			// https://github.com/robwierzbowski/node-pixrem
			require('pixrem')(),
			// Postcss flexbox bug fixer
			// https://github.com/luisrudge/postcss-flexbugs-fixes
			require('postcss-flexbugs-fixes')(),
			// Log PostCSS messages in the console
			// https://github.com/postcss/postcss-reporter
			require('postcss-reporter')()
		]))
		.pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' })))
		.pipe(reload({ stream: true }));
});

gulp.task('lint-css', function lintCssTask() {
	return gulp
		.src('app/styles/*.scss')
		.pipe(gulpStylelint({
			syntax: 'scss',
			reporters: [
				{
					formatter: 'string',
					console: true
				}
			]
		}));
});

gulp.task('scripts', () => {
	const bundler = browserify('app/scripts/main.js', {
		fullPaths: false,
		debug: true
	});

	const bundleTimer = $.duration('JS browserify bundle time');

	bundler.transform(babelify, {
		presets: ['es2015'],
		plugins: ['transform-runtime'],
		sourceMaps: true
	});

	if (GLOBAL.config.env !== 'dev') {
		bundler.transform(rollupify);
	}

	return bundler
		.bundle()
		.on('error', mapError) // Map error reporting
		.pipe(source('main.build.js')) // Set source name
		.pipe($.plumber()) // Prevent pipe breaking caused by errors from gulp plugins
		.pipe(buffer()) // Convert to gulp pipeline
		.pipe($.sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
		.pipe($.sourcemaps.write('.')) // Set folder for sourcemaps to output to
		.pipe(gulp.dest('.tmp/scripts')) // Set the output folder
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' }))) // Output the file being created
		.pipe(bundleTimer) // Output time timing of the file creation
		.pipe(reload({ stream: true })); // Reload the view in the browser
});

function lint(files, options) {
	return gulp.src(files)
		.pipe(reload({ stream: true, once: true }))
		.pipe($.eslint(options))
		.pipe($.eslint.format(prettyFormatter))
		.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
	return lint('app/scripts/**/*.js', {
		fix: true
	})
	.pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
	return lint('test/spec/**/*.js', {
		fix: true,
		env: {
			mocha: true
		}
	})
	.pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
	return gulp.src('app/*.html')
		.pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
		.pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src('app/images/**/*')
		.pipe($.cache($.imagemin()))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', (err) => {
		if (err) {
			$.util.log(chalk.red(err));
		}
	})
		.concat('app/fonts/**/*'))
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch([
		'app/*.html',
		'app/images/**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/fonts/**/*', ['fonts']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('serve:test', ['scripts'], () => {
	browserSync({
		notify: false,
		port: 9000,
		ui: false,
		server: {
			baseDir: 'test',
			routes: {
				'/scripts': '.tmp/scripts',
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('test/spec/**/*.js').on('change', reload);
	gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
	gulp.src('app/styles/*.scss')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)+/
		}))
		.pipe(gulp.dest('app/styles'));

	gulp.src('app/*.html')
		.pipe(wiredep({
			exclude: ['bootstrap-sass'],
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'lint-css','html', 'images', 'fonts', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
	GLOBAL.config.env = 'prod';
	GLOBAL.config.notify = false;

	gulp.start('build');
});
