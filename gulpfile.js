const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
 
gulp.task('default', () =>
	gulp.src('assets/images/**/*')
		.pipe(imagemin({verbose: true}))
		.pipe(gulp.dest('assets/images'))
);
