export const fontsTask = () => {
  return app.gulp
    .src(app.paths.src.fonts, { encoding: false })
    .pipe(app.plugins.plumber())
    .pipe(app.gulp.dest(app.paths.dist.fonts))
    .pipe(app.plugins.browserSync.stream());
};
