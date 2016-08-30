const gulp = require('gulp');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const sync = require('browser-sync');
const $ = require('gulp-load-plugins')();

const through2 = require('through2');
const browserify = require('browserify');
const babelify = require('babelify');

const path = require('path');

const reload = sync.reload;

const port = 8080;

const dependencies = [
  'react',
  'react-dom'
];

gulp.task('javascript', function () {
  return gulp.src('app/js/main.js')
    .pipe(through2.obj(function (file, enc, next) { // workaround for https://github.com/babel/babelify/issues/46
      browserify({
        entries: file.path,
        extensions: ['.js', '.jsx'],
        debug: true,
        transform: babelify
      }).bundle(function(err, res) {
        if (err) return next(err);
        file.contents = res;
        next(null, file);
      });
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('stylesheets', function ()  {
  return gulp.src('app/stylesheets/**/*.scss')
    .pipe($.sass())
    .pipe($.postcss([
      require('autoprefixer')({browsers: ['last 2 versions', 'Firefox ESR', 'Explorer >= 9', 'Android >= 4.0', '> 2%']})
    ]))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('stl', function () {
  return gulp.src('app/stl/*.stl')
    .pipe(gulp.dest('dist/stl'));
});

gulp.task('html', ['javascript', 'stylesheets', 'stl'], function () {
  return gulp.src('app/*.html')
    .pipe($.useref({}))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['html'], function () {
  sync({
    notify: false,
    port: port,
    server: {
      baseDir: ['./dist'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch(['./dist/**/*']).on('change', reload);

  gulp.watch(['./app/js/**/*.{js,jsx}'], ['javascript']);
  gulp.watch(['./app/stylesheets/**/*.scss'], ['stylesheets']);
  gulp.watch(['./app/stl/*.stl'], ['stl']);
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['serve']);
