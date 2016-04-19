import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'; // Used to automaticaly refresh the browser
import del from 'del'; // Used for cleaning up the folders
import { stream as wiredep } from 'wiredep'; // Used to inject bower components into index.html
import babelify from 'babelify'; // Used to convert ES6 & JSX to ES5
import rollupify from 'rollupify'; // Used to tree shake the code
import browserify from 'browserify'; // Providers "require" support, CommonJS
import chalk from 'chalk'; // Allows for coloring for logging
import source from 'vinyl-source-stream'; // Vinyl stream support
import buffer from 'vinyl-buffer'; // Vinyl stream support
import prettyFormatter from 'eslint-formatter-pretty'; // ESlint log pretty format


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
		.pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' })))
		.pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
	const bundler = browserify('app/scripts/main.js', {
		fullPaths: false,
		debug: true
	});

	const bundleTimer = $.duration('JS browserify bundle time');

	if (GLOBAL.config.env !== 'dev') {
		bundler.transform(rollupify);
	}

	bundler.transform(babelify, {
		presets: ['es2015'],
		sourceMaps: true
	});

	return bundler
		.bundle()
		.on('error', mapError) // Map error reporting
		.pipe(source('main.js')) // Set source name
		.pipe(buffer()) // Convert to gulp pipeline
		.pipe($.rename('main.build.js')) // Rename the output file
		.pipe($.sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
		.pipe($.sourcemaps.write('.')) // Set folder for sourcemaps to output to
		.pipe(gulp.dest('.tmp/scripts')) // Set the output folder
		.pipe($.if(GLOBAL.config.notify, $.notify({ message: 'Generated file: <%= file.relative %>' }))) // Output the file being created
		.pipe(bundleTimer) // Output time timing of the file creation
		.pipe(reload({ stream: true })); // Reload the view in the browser
});

function lint(files, options) {
	return () => {
		return gulp.src(files)
			.pipe(reload({ stream: true, once: true }))
			.pipe($.eslint(options))
			.pipe($.eslint.format(prettyFormatter))
			.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
	};
}
const testLintOptions = {
	env: {
		mocha: true
	}
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

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
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{ cleanupIDs: false }]
		})))
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

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
	GLOBAL.config.env = 'prod';
	GLOBAL.config.notify = false;

	gulp.start('build');
});
