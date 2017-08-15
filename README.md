### gulp 自动化构建

[关于gulp详细内容可查看我的博客](http://www.cnblogs.com/queff/p/6770227.html "关于gulp详细内容可查看我的博客") 

本例已经写好了package.json文件
第一步 安装依赖 会生成 对应的node_modules

    npm install gulp
也可以使用淘宝镜像 来安装
npm install -g cnpm --registry=https://registry.npm.taobao.org
下面看一下gulpfile的代码：
定义需要引用的模块
```javascript
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

``` 

定义路径变量
```javascript
//paths
var baseUrl= {
		less: 'css',
		scripts: 'js'
	},
	paths = {
		less: baseUrl.less+'/demo.less',
		scripts: baseUrl.scripts+'/demo.js'
	};
```

```javascript
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
```

上面定义了3个任务，分别是less，scripts和watch, less和scripts分别是对less和js压缩打包，watch 用于指定需要监视的文件。一旦这些文件发生变动，就运行指定任务

接下来我们运行：
``gulp less``  `gulp scripts` `gulp watch`

```javascript

[15:40:56] Starting 'less'...
[15:40:56] gulp-notify: [Gulp notification] less task complete
[15:40:56] gulp-notify: [Gulp notification] less task complete
[15:40:56] Finished 'less' after 97 ms
```

```javascript
[16:35:33] Starting 'scripts'...
[16:35:33] gulp-notify: [Gulp notification] scripts task complete
[16:35:33] gulp-notify: [Gulp notification] scripts task complete
[16:35:33] Finished 'scripts' after 101 ms
```
此时可以看到 css目录下会生成demo.css，demo.min.css和demo.min.css.map，js目录下会生成demo.min.js和demo.min.js.map。


这里我建了一个active.bat 批处理文件，全局安装gulp以后，运行这个就可以实时监听。

