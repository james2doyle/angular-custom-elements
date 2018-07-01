const gulp = require('gulp');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const babelify = require('babelify');

gulp.task('js', () => {
  gulp.src('src/index.js')
    .pipe(browserify({
      insertGlobals: true,
      transform: [babelify.configure({
        // presets: ['es2015']
        sourceMaps: true
      })]
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['js'], () => {
  // fired before 'finished' event
});
