# Nunjucks template engine

This recipe shows how to set up Nunjucks to compile your templates, including LiveReload integration.

## Steps

### Step 1 - Folder structure.

Remove / rename the `app/index.html` file to `index.njk`

Add more files, includes, or whatever you need for your structure. We will check all files with `.njk` extension and compile all of them.

### Step 2 - Install dependencies

```shell
$ npm install --save-dev gulp-nunjucks-render
```

### Step 3 - Create a views task

```diff
gulp.task('views', () => {
	return gulp.src('app/*.njk')
		.pipe($.nunjucksRender({
			path: 'app'
		}))
		.pipe(gulp.dest('.tmp'))
+		.pipe(reload({ stream: true }));
});
```

This compiles app/*.njk files into static .html files in the .tmp directory.

### Step 4 - Add views as a dependency of both html and serve

```js
gulp.task('html', ['views', 'styles', 'scripts'], () => {
...

gulp.task('serve', ['views', 'styles', 'fonts'], () => {
...
```

### Step 5 - Configure html task to include files from .tmp

```diff
 gulp.task('html', ['styles', 'views', 'scripts'], () => {
-	return gulp.src('app/*.html')
+	return gulp.src(['app/*.html', '.tmp/*.html'])
 		.pipe($.if('*.js', $.uglify()))
 		.pipe($.if('*.css', $.cssnano()))
 		.pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
 		.pipe(gulp.dest('dist'));
 });
```

### Step 6 - Update extras

We don't want to copy over `.njk` files in the build process:

```diff
 gulp.task('extras', () => {
 	return gulp.src([
 		'app/*.*',
-		'!app/*.html'
+		'!app/*.html',
+		'!app/*.njk'
 	], {
 		dot: true
 	}).pipe(gulp.dest('dist'));
});
```

### Step 7 - Edit your serve task

Edit your `serve` task to watch HTML files in `.tmp`, and so that (a) editing an `app/**/*.html` or app/**/*.njk file triggers the `views` task, and (b) reloads the browser:

```diff
 gulp.task('serve', ['views', 'styles', 'fonts'], () => {
 ...
 	gulp.watch([
- 		'app/*.html',
 		'.tmp/styles/**/*.css',
 		'app/scripts/**/*.js',
 		'app/images/**/*'
 	]).on('change', reload);

+	gulp.watch('app/**/*.html', ['views']);
+	gulp.watch('app/**/*.njk', ['views']);
 	gulp.watch('app/styles/**/*.scss', ['styles']);
 	gulp.watch('bower.json', ['wiredep', 'fonts']);
});
```

Notice we are still watching `.html` files in `app` because our templates have a different extension.
