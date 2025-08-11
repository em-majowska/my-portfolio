const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const eslint = require('gulp-eslint-new');
const deploy = require('gulp-gh-pages');

function cleanDist() {
  return gulp.src('./dist', { read: false, allowEmpty: true }).pipe(clean());
}
function styles() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function html() {
  return gulp.src('./src/*.html').pipe(gulp.dest('./dist'));
}

function scripts() {
  return (
    gulp
      .src('./src/js/**/*.js')
      // .pipe(eslint())
      // .pipe(eslint.format())
      // .pipe(eslint.failAfterError())
      .pipe(
        babel({
          presets: ['@babel/preset-env'],
        })
      )
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
  );
}

function assets() {
  return gulp
    .src('src/assets/**/*', { base: 'src/assets' })
    .pipe(gulp.dest('dist/assets'));
}

const build = gulp.series(
  cleanDist,
  gulp.parallel(styles, html, assets, scripts)
);
exports.build = build;

function deployTask() {
  return gulp.src('./dist/**/*').pipe(deploy());
}
exports.deploy = gulp.series(build, deployTask);
