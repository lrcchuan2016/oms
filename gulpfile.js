var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var concatcss = require('gulp-concat-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

gulp.task('default', ['sass', 'copy-bootstrap', 'concat-vendor-js', 'concat-js', 'compile-templates']);

gulp.task('sass', function(done){
	var paths = {
		sassSrc : './www/scss/**/*.scss',
		cssDst : './www/css/app.css',
	};

	gulp.src(paths.sassSrc)
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(concatcss(paths.cssDst))
		.pipe(minifycss())
		.pipe(gulp.dest('./'));

	done();
});

gulp.task('copy-bootstrap', function(done){
	var paths = {
		cssSrc : './www/lib/bootstrap/dist/css/bootstrap.min.css',
		cssDst : './www/css/',
		fontsSrc : './www/lib/bootstrap/dist/fonts/*',
		fontsDst : './www/fonts'
	};

	gulp.src(paths.cssSrc)
		.pipe(gulp.dest(paths.cssDst));

	gulp.src(paths.fontsSrc)
		.pipe(gulp.dest(paths.fontsDst));

	done();
});

gulp.task('concat-vendor-js', function(done){
	var paths = {
		src : [
			'./www/lib/angular/angular.min.js',
			'./www/lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
			'./www/lib/angular-ui-router/release/angular-ui-router.js'
		],
		dst : './www/js/core.js'
	};

	gulp.src(paths.src)
		.pipe(concat(paths.dst))
		.pipe(gulp.dest('./'));

	done();
});

gulp.task('concat-js', function(done){
	var paths = {
		src : [
			'./www/js/oms.js',
			'./www/customers/*.js'
		],
		dst : './www/js/app.js'
	}

	gulp.src(paths.src)
		.pipe(concat(paths.dst))
		//.pipe(uglify())
		.pipe(gulp.dest('./'));

	done();
});

gulp.task('compile-templates', function(done){
	var paths = {
		src: './www/**/*.template.html',
		dst: './www/js/'
	}
	gulp.src(paths.src)
        .pipe(templateCache({ standalone:true }))
				//.pipe(uglify())
				.pipe(gulp.dest(paths.dst));
	done();
});