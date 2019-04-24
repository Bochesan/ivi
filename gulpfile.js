'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const rupture = require('rupture');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const clear = require('gulp-clean');
const stream = require('gulp-watch');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const pug = require('gulp-pug');

let path = {

	src: {
        common: './assets/styles/common.styl',
        html: './*.html',
		pug: './pug/**/*.pug',
		styles: './assets/styles/**/*.styl',
		js: './assets/scripts/**/*.js',
		clear: './assets/build/*'
	},

	watch: ['./**/*.styl', './**/*.js', './**/*.pug' ],

	dest: {
		html: './',
		styles: './assets/build/',
		js: './assets/build/',
	}

}

// BrowserSync
function bsReload() {
	browserSync.init({
		server: {
		  baseDir: './'
		}
	});
}

// BrowserSync Reload
function browserSyncReload(cb) {
	browserSync.reload();
	cb();
}

//Pug to HTML
function html() {
	return gulp.src(path.src.pug)
	.pipe(plumber())
	.pipe(pug({
        pretty: true
    }))
	.pipe(gulp.dest(path.dest.html))
	.pipe(browserSync.stream());
}

// CSS
function css() {
    return gulp.src(path.src.common)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(stylus({use:[rupture()]}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 11', 'Android >= 4.1', 'Safari >= 8', 'iOS >= 8']}))
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest.styles))
    .pipe(browserSync.stream());
}

// JS
function js() {
    return gulp.src(path.src.js)
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(babel({
		 presets: ['@babel/env']
	}))
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.dest.js))
	.pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
	gulp.watch(path.src.styles, css);
    gulp.watch(path.src.js, js);
	gulp.watch(path.src.pug, html);
	gulp.watch(path.src.html, browserSyncReload);
}

// Clean
function clean() {
    return gulp.src(path.src.clear)
      .pipe(clear());
}

let build = gulp.parallel(js, css);

exports.html = html;
exports.build = build;
exports.watch = watchFiles;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.default = gulp.series(clean, build, gulp.parallel(bsReload, watchFiles));
