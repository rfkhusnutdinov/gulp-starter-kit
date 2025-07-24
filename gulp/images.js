import imagemin, { gifsicle, optipng, mozjpeg, svgo } from "gulp-imagemin";
import gulpIf from "gulp-if";
import webp from "gulp-webp";
import newer from "gulp-newer";

export const imagesTask = () => {
  return app.gulp
    .src(app.paths.images.src, { encoding: false })
    .pipe(
      gulpIf(
        (file) => [".jpg", ".jpeg", ".png"].includes(file.extname),
        newer({ dest: app.paths.images.dist, ext: ".webp" }),
        newer(app.paths.images.dist)
      )
    )
    .pipe(
      gulpIf(
        (file) => [".jpg", ".jpeg", ".png"].includes(file.extname),
        webp({
          quality: 75,
          method: 6,
          nearLossless: 0,
          lossless: false,
          alphaQuality: 80,
        })
      )
    )
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
