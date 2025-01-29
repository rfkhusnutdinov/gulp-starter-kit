import imagemin, { gifsicle, optipng, mozjpeg, svgo } from "gulp-imagemin";
import gulpIf from "gulp-if";

export const imagesTask = () => {
  return app.gulp
    .src(app.paths.images.src, { encoding: false })
    .pipe(
      gulpIf(
        app.mode === "production",
        imagemin(
          [
            mozjpeg({
              quality: 80,
              progressive: true,
            }),
            optipng({
              optimizationLevel: 3,
            }),
            gifsicle(),
            svgo(),
          ],
          {
            verbose: true,
          }
        )
      )
    )
    .pipe(app.gulp.dest(app.paths.images.dist))
    .pipe(gulpIf(app.mode === "development", app.browserSync.stream()));
};
