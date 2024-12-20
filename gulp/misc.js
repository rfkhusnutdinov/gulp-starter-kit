export const miscTask = () => {
  return app.gulp
    .src(app.paths.src.misc)
    .pipe(app.gulp.dest(app.paths.dist.misc))
    .pipe(app.plugins.browserSync.stream());
};
