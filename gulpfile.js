const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create(); // Used to automaticaly refresh the browser
const del = require('del'); // Used for cleaning up the folders
const babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
const browserify = require('browserify'); // Providers "require" support, CommonJS
const chalk = require('chalk'); // Allows for coloring for logging
const source = require('vinyl-source-stream'); // Vinyl stream support
const buffer = require('vinyl-buffer'); // Vinyl stream support
const prettyFormatter = require('eslint-formatter-pretty'); // ESlint log pretty format
const postcssScss = require('postcss-scss'); // SCSS parser for PostCSS

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

global.config = {
	isDev: true,
	notify: false
};

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
		.pipe($.if(global.config.isDev, $.sourcemaps.init({ loadMaps: true }))) // Extract the inline sourcemaps
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
		], {
			syntax: postcssScss,
			parser: postcssScss
		}
		))
		.pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
		.pipe($.if(global.config.isDev, $.sourcemaps.write('.')))
		.pipe(gulp.dest('.tmp/styles'))
		.pipe($.if(global.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' })))
		.pipe(reload({ stream: true }));
});

gulp.task('lint-css', function lintCssTask() {
	return gulp
		.src('app/styles/**/*.scss')
		.pipe($.stylelint({
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

	return bundler
		.bundle()
		.on('error', mapError) // Map error reporting
		.pipe(source('main.build.js')) // Set source name
		.pipe($.plumber()) // Prevent pipe breaking caused by errors from gulp plugins
		.pipe(buffer()) // Convert to gulp pipeline
		.pipe($.if(global.config.isDev, $.sourcemaps.init({ loadMaps: true }))) // Extract the inline sourcemaps
		.pipe($.if(global.config.isDev, $.sourcemaps.write('.')))
		.pipe(gulp.dest('.tmp/scripts')) // Set the output folder
		.pipe($.if(global.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' }))) // Output the file being created
		.pipe(bundleTimer) // Output time timing of the file creation
		.pipe(reload({ stream: true })); // Reload the view in the browser
});

function lint(files) {
	return gulp.src(files)
		.pipe($.eslint({
			fix: true
		}))
		.pipe(reload({ stream: true, once: true }))
		.pipe($.eslint.format(prettyFormatter))
		.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
	return lint('app/scripts/**/*.js')
		.pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
	return lint('test/spec/**/*.js')
		.pipe(gulp.dest('test/spec'));
});

gulp.task('html', gulp.series(gulp.parallel('styles', 'scripts'), function htmlBundle() {
	return gulp.src('app/*.html')
		.pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
		.pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
		.pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
		.pipe($.if(/\.html$/, $.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: { compress: { drop_console: true } },
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		})))
		.pipe(gulp.dest('dist'));
}));

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

gulp.task('serve', gulp.series(gulp.parallel('styles', 'scripts', 'fonts'), function serveBundle() {
	browserSync.init({
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

	gulp.watch('app/styles/**/*.scss', gulp.series('styles'));
	gulp.watch('app/scripts/**/*.js', gulp.series('scripts'));
	gulp.watch('app/fonts/**/*', gulp.series('fonts'));
}));

gulp.task('serve:dist', () => {
	browserSync.init({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('serve:test', gulp.series('scripts', function serveTest() {
	browserSync.init({
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

	gulp.watch('app/scripts/**/*.js', gulp.series('scripts'));
	gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
	gulp.watch('test/spec/**/*.js', gulp.series('lint:test'));
}));

gulp.task(
	'build',
	gulp.series(gulp.parallel('lint', 'lint-css'),
	gulp.parallel('html', 'images', 'fonts', 'extras'),
	function build() {
		return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
	}
));

gulp.task('default', gulp.series('clean', function defaultTask(done) {
	global.config.isDev = false;
	global.config.notify = false;

	done();
}, 'build'));
