export const fontsTask = () => {
  return app.gulp
    .src(app.paths.fonts.src, { encoding: false })
    .pipe(app.plumber())
    .pipe(app.gulp.dest(app.paths.fonts.dist))
    .pipe(app.browserSync.stream());
};
