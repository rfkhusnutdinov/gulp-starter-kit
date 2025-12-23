import ttf2woff2 from "gulp-ttf2woff2";

export const fontsTask = () => {
  return app.gulp
    .src(app.paths.fonts.src, { encoding: false, removeBOM: false })
    .pipe(ttf2woff2())
    .pipe(app.plumber())
    .pipe(app.gulp.dest(app.paths.fonts.dist))
    .pipe(app.browserSync.stream());
};
