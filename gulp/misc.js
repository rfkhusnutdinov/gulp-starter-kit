export const miscTask = () => {
  return app.gulp
    .src(app.paths.misc.src, { encoding: false })
    .pipe(app.gulp.dest(app.paths.misc.dist))
    .pipe(app.browserSync.stream());
};
