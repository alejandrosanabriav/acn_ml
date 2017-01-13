const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('./scss/base.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('concat', function() {

  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/flexslider/jquery.flexslider-min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/sidr/dist/jquery.sidr.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-styles', function() {
   return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'public/css/base.css',
    'node_modules/flexslider/flexslider.css',
    'node_modules/sidr/dist/stylesheets/jquery.sidr.light.min.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css/'));
});