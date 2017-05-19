var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var cssmin      = require('gulp-cssmin');
var htmlmin     = require('gulp-minify-html');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var sass		= require('gulp-sass');
var plumber 	= require('gulp-plumber');

gulp.task('build', function () {
    return browserify({entries: './src/js/main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
    		.pipe(plumber({
    			errorHandler: onError
    		}))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/js'))
        .pipe(livereload())
});

gulp.task('sass', function(){
	gulp.src('./src/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
        .pipe(cssmin())
		.pipe(gulp.dest('./build/css'))
});

gulp.task('html', function(){
	gulp.src('./src/*.html')
        .pipe(htmlmin())
		.pipe(gulp.dest('./build'))
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./src/js/*.js', ['build']);
	gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', ['build', 'sass', 'html', 'watch']);

var onError = function (err) {
  gutil.beep();
  console.log(err.toString());
};
