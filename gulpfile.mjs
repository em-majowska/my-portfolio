import gulp from 'gulp';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import replace from 'gulp-replace';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint-new';
import uglify from 'gulp-uglify';
import ghpages from 'gh-pages';
import { promisify } from 'util';
import browserSync from 'browser-sync';

const isProd = process.env.NODE_ENV === 'production';
const sassCompiler = gulpSass(dartSass);
const publish = promisify(ghpages.publish);
const sync = browserSync.create();
const paths = {
  html: './src/*.html',
  styles: './src/scss/**/*.scss',
  scripts: './src/js/**/*.js',
  assets: './src/assets/**/*.*',
};

/* DEVELOPMENT TASKS */
// function htmlDev() {
//   return gulp.src(paths.html).pipe(gulp.dest('./dist'));
// }

// function stylesDev() {
//   return gulp
//     .src(paths.styles)
//     .pipe(sourcemaps.init())
//     .pipe(sassCompiler().on('error', sassCompiler.logError))
//     .pipe(replace('../../src/assets', '../assets'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dist/css'));
// }

// function scriptsDev() {
//   return gulp
//     .src(paths.scripts)
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//     .pipe(babel())
//     .pipe(gulp.dest('./dist/js'));
// }

// /* PRODUCTION TASKS */
// function htmlProd() {
//   return gulp
//     .src(paths.html)
//     .pipe(
//       htmlmin({
//         collapseWhitespace: true,
//         removeComments: true,
//         removeRedundantAttributes: true,
//       })
//     )
//     .pipe(gulp.dest('./dist'));
// }

// function stylesProd() {
//   return gulp
//     .src(paths.styles)
//     .pipe(sassCompiler().on('error', sassCompiler.logError))
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(replace('../../src/assets', '../assets'))
//     .pipe(replace('@charset "UTF-8";', ''))
//     .pipe(gulp.dest('./dist/css'));
// }

// function scriptsProd() {
//   return gulp
//     .src(paths.scripts)
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'));
// }

// function cleanDist() {
//   return deleteAsync(['dist']);
// }

// function babelPolyfill() {
//   return gulp
//     .src([
//       './node_modules/core-js-bundle/minified.js',
//       './node_modules/regenerator-runtime/runtime.js',
//     ])
//     .pipe(gulp.dest('dist/polyfills'));
// }

// function assets() {
//   return gulp.src(paths.assets, { base: 'src' }).pipe(gulp.dest('dist'));
// }

// function serve() {
//   sync.init({
//     server: './dist',
//     port: 8080,
//     ui: { port: 8081 },
//   });

//   gulp.watch(paths.html, htmlDev).on('change', sync.reload);
//   gulp.watch(paths.styles, stylesDev).on('change', sync.reload);
//   gulp.watch(paths.scripts, scriptsDev).on('change', sync.reload);
// }

// /* PIPELINES */
// export const buildDev = gulp.series(
//   cleanDist,
//   gulp.parallel(stylesDev, htmlDev, assets, scriptsDev, babelPolyfill)
// );

// export const buildProd = gulp.series(
//   cleanDist,
//   gulp.parallel(stylesProd, htmlProd, assets, scriptsProd, babelPolyfill)
// );

// export const deployGhPages = gulp.series(
//   buildProd,
//   async function deployTask() {
//     await publish('dist');
//   }
// );

// export default gulp.series(buildDev, serve);

/* ----------------------------
   HTML
---------------------------- */
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

/* ----------------------------
   Styles
---------------------------- */
function styles() {
  return gulp
    .src(paths.styles)
    .pipe(!isProd ? sourcemaps.init() : gulp.dest('.'))
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(postcss(isProd ? [autoprefixer(), cssnano()] : []))
    .pipe(replace('../../src/assets', '../assets'))
    .pipe(!isProd ? sourcemaps.write('.') : gulp.dest('.'))
    .pipe(gulp.dest('dist/css'));
}

/* ----------------------------
   Scripts
---------------------------- */
function scripts() {
  return gulp
    .src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(isProd ? uglify() : gulp.dest('.'))
    .pipe(gulp.dest('dist/js'));
}

/* ----------------------------
   Assets & Polyfills
---------------------------- */
function assets() {
  return gulp.src(paths.assets, { base: 'src' }).pipe(gulp.dest('dist'));
}

function babelPolyfill() {
  return gulp
    .src([
      './node_modules/core-js-bundle/minified.js',
      './node_modules/regenerator-runtime/runtime.js',
    ])
    .pipe(gulp.dest('dist/polyfills'));
}

/* ----------------------------
   Clean & Serve
---------------------------- */
function cleanDist() {
  return deleteAsync(['dist']);
}

function serve() {
  sync.init({
    server: 'dist',
    port: 8080,
    ui: { port: 8081 },
  });

  gulp.watch(paths.html, html).on('change', sync.reload);
  gulp.watch(paths.styles, styles).on('change', sync.reload);
  gulp.watch(paths.scripts, scripts).on('change', sync.reload);
}

/* ----------------------------
   Pipelines
---------------------------- */
export const build = gulp.series(
  cleanDist,
  gulp.parallel(styles, html, assets, scripts, babelPolyfill)
);

export const deployGhPages = gulp.series(build, async () => {
  await publish('dist');
});

export default gulp.series(build, serve);
