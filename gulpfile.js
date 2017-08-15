/*!
 * gulp 自动化构建
 * $ npm install -g cnpm --registry=https://registry.npm.taobao.org
 */
 
// plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),   
	sourcemaps = require('gulp-sourcemaps'),    
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del'),
    livereload = require('gulp-livereload');

//paths
var baseUrl= {
		less: 'css',
		scripts: 'js'
	},
	paths = {
		less: baseUrl.less+'/demo.less',
		scripts: baseUrl.scripts+'/demo.js'
	};    


// Default task
gulp.task('default',function() {
    console.log("no task");
});


gulp.task('less',function() {
return	gulp.src(paths.less)
	.pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gulp.dest(baseUrl.less))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(sourcemaps.write("../"+baseUrl.less))
    .pipe(gulp.dest(baseUrl.less))
    .pipe(notify({ message: 'less task complete' }));
});

gulp.task('scripts',function() {
return	gulp.src(paths.scripts)
	.pipe(sourcemaps.init())
	.pipe(gulp.dest(baseUrl.scripts))
 	.pipe(jshint())       // 进行检查
    .pipe(jshint.reporter('default'))  // 对代码进行报错提示		
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
    .pipe(sourcemaps.write('../'+baseUrl.scripts))
    .pipe(gulp.dest(baseUrl.scripts))
    .pipe(notify({ message: 'scripts task complete' }));
});



// Watch
gulp.task('watch', function() {   
	gulp.watch([paths.less],['less']);
	gulp.watch([paths.scripts],['scripts']);
});