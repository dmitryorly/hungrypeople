const {src, dest, series, watch} = require('gulp');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

function buildHtml() {
  return src('src/pug/**.pug')
    .pipe(pug({pretty: '\t'}))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('dist'))
}

function buildSass() {
  return src('src/sass/main.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(csso())
    .pipe(dest('dist'))
}

function buildJS() {
  return src('src/js/main.js')
    .pipe(dest('dist'))
}

function clear() {
  return del(['dist/*', '!dist/fonts', '!dist/img'])
}

function clearImg() {
  return del('dist/img/**.*')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/pug/**.pug', series(buildHtml)).on('change', sync.reload)
  watch('src/sass/**.sass', series(buildSass)).on('change', sync.reload)
  watch('src/js/**.js', series(buildJS)).on('change', sync.reload)
}

function compress() {
  return src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

exports.build = series(clear, buildHtml, buildSass, buildJS);
exports.clear = clear;
exports.serve = series(clear, buildHtml, buildSass, buildJS, serve);
exports.clearCompress = series(clearImg, compress);