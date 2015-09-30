var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack( {
      output: {
        filename: 'bundle.js'
      }
      // module: {
      //   loaders: [
      //       { test: /\.css$/, loader: "style!css" }
      //   ]
      // }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  return gulp.watch(['index.js', 'app/**/*', 'build/**/*', 'test/**/*test.js', 'lib/**/*.js'], ['default']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);