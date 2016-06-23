/*
* Task Automation to make my life easier.
* Author: Jean-Pierre Sierens
* ===========================================================================
*/

// declarations, dependencies
// ----------------------------------------------------------------------------
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');
const sync = require('browser-sync');
const $ = require('gulp-load-plugins')();

const path = require('path');

const reload = sync.reload;

const port = 9000;

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const dependencies = [
  'react',
  'react-dom'
];

// keep a count of the times a task refires
let scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', () => {
    bundleApp(false);
});

gulp.task('stylesheets', () => {
  return gulp.src('app/stylesheets/styles.scss')
    .pipe($.sass())
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('deploy', () => {
  bundleApp(true);
});

gulp.task('serve', () => {
  sync({
    notify: false,
    port: port,
    server: {
      baseDir: ['./app'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })

  gulp.watch(['./app/**/*.js'], ['scripts']).on('change', reload);
  gulp.watch(['./app/**/*.scss'], ['stylesheets']).on('change', reload);
})

gulp.task('default', ['scripts','stylesheets', 'serve']);

// Private Functions
// ----------------------------------------------------------------------------
const bundleApp = (isProduction) => {
  scriptsCount++;

  const appBundler = browserify({
    entries: './app/js/app.js',
    debug: true
  });

  if (!isProduction && scriptsCount === 1) {
    browserify({
      require: dependencies,
      debug: true
  })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./dist/js/'));
  }
  if (!isProduction){
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    })
  }

  appBundler
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
};
