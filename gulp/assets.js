import imagemin, { gifsicle, optipng, mozjpeg, svgo } from "gulp-imagemin";
import gulpIf from "gulp-if";

export const assetsTask = () => {
  return app.gulp
    .src(app.paths.src.assets, { encoding: false })
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
    .pipe(app.gulp.dest(app.paths.dist.assets))
    .pipe(gulpIf(app.mode === "development", app.plugins.browserSync.stream()));
};
