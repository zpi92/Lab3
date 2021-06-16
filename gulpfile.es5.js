//Подключаем модуль Gulp
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

//Порядок подключения css файлов
var cssFiles = ['./bootstrap/css/bootstrap.min.css', './css/jquery.fancybox.min.css'];

//Порядок подключения css файлов
var jsFiles = ['./js/jquery-3.3.1.min.js', './js/popper.min.js'];

//Таск для стилей CSS
function styles() {
	//Шаблон для поиска файлов CSS
	return gulp.src(cssFiles)
	//Объединение файлов в один
	.pipe(concat('style.css'))
	//Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/css'));
}

//Таск для скриптов JavaScript
function scripts() {
	//Шаблон для поиска файлов JavaScript
	return gulp.src(jsFiles)
	//Объединение файлов в один
	.pipe(concat('script.js'))
	//Минификация JavaScript
	.pipe(uglify())
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/js'));
}

//Вызов функций
gulp.task('styles', styles);
gulp.task('scripts', scripts);

