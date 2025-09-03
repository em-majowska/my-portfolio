import gulp from 'gulp';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import replace from 'gulp-replace';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint-new';
import uglify from 'gulp-uglify';
import ghpages from 'gh-pages';
import { promisify } from 'util';
import browserSync from 'browser-sync';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import noop from 'gulp-noop';
import webp from 'gulp-webp';

export function webpConvert() {
  return gulp
    .src('src/assets/img/**/*.{png,jpg,jpeg}')
    .pipe(webp())
    .pipe(gulp.dest('src/assets/img'));
}

const isProd = process.env.NODE_ENV === 'production';
const sassCompiler = gulpSass(dartSass);
const publish = promisify(ghpages.publish);
const sync = browserSync.create();
const plugins = {
  dev: [autoprefixer()],
  prod: [
    autoprefixer(),
    cssnano({
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          minifyFontValues: { removeQuotes: false },
        },
      ],
    }),
  ],
};

const paths = {
  html: './src/*.html',
  styles: './src/scss/**/*.scss',
  scripts: './src/js/**/*.js',
  assets: './src/assets/**/*.*',
};

/* HTML */
function html() {
  return gulp
    .src(paths.html)
    .pipe(
      isProd
        ? htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
          })
        : gulp.dest('dist')
    )
    .pipe(gulp.dest('dist'));
}

/* Styles */
function styles() {
  return (
    gulp
      .src(paths.styles)
      // .pipe(isProd ? noop() : sourcemaps.init())
      .pipe(sassCompiler().on('error', sassCompiler.logError))
      .pipe(postcss(isProd ? plugins.prod : plugins.dev))
      .pipe(replace('../../assets', '../assets'))
      // .pipe(isProd ? noop() : sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'))
  );
}

/* Scripts */
function scripts() {
  return gulp
    .src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(isProd ? uglify() : gulp.dest('dist/js'))
    .pipe(gulp.dest('dist/js'));
}

/* Assets */
function otherAssets() {
  return gulp
    .src([paths.assets, `!${paths.assets}/**/*.{jpg, png, svg}`], {
      base: 'src',
    })
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp
    .src('src/assets/**/*.{jpg,png,svg}')
    .pipe(
      isProd
        ? imagemin(
            [
              svgo({
                plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'removeDimensions', active: false },
                  { name: 'removeUselessDefs', active: false },
                  { name: 'cleanupIDs', active: false },
                  { name: 'removeUnknownsAndDefaults', active: false },
                ],
              }),
              optipng(),
            ],
            { verbose: true }
          )
        : gulp.dest('dist/assets')
    )
    .pipe(gulp.dest('dist/assets'));
}
const assets = gulp.parallel(otherAssets, images);

/* Clean & Serve */
function cleanDist() {
  return deleteAsync(['dist']);
}

export function serve() {
  sync.init({
    server: 'dist',
    port: 8080,
    ui: { port: 8081 },
  });

  gulp.watch(paths.html, html).on('change', sync.reload);
  gulp.watch(paths.styles, styles).on('change', sync.reload);
  gulp.watch(paths.scripts, scripts).on('change', sync.reload);
}

export const build = gulp.series(
  cleanDist,
  gulp.parallel(styles, html, assets, scripts)
);

export const deployGhPages = gulp.series(build, async () => {
  await publish('dist');
});

export default gulp.series(build, serve);
