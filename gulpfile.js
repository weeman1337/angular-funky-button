var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp
        .src([
            'src/js/funky-button.js',
            'src/js/funkyButton.js',
            'src/js/FunkyButtonController.js',
            'src/js/FunkyButtonLinker.js',
            'src/js/FunkyButtonStateHelper.js',
            'src/js/FunkyButtonOptionsHelper.js'
        ])
        .pipe(concat('angular-funky-button.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('angular-funky-button.min.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));

    gulp
        .src([
            'src/css/funky-button.css'
        ])
        .pipe(concat('angular-funky-button.css'))
        .pipe(gulp.dest('dist'));
});
