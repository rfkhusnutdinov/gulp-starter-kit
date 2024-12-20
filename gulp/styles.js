import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import mincss from "gulp-clean-css";
import rename from "gulp-rename";
import * as dartSass from "sass";
// import groupmedia from "gulp-group-css-media-queries";
import gulpIf from "gulp-if";

const scss = gulpSass(dartSass);

export const stylesTask = () => {
  return (
    app.gulp
      .src(app.paths.src.scss, {
        sourcemaps: app.mode === "development" ? true : false,
      })
      .pipe(
        gulpIf(
          app.mode === "development",
          scss().on("error", scss.logError),
          scss()
        )
      )
      // .pipe(groupmedia())
      .pipe(
        autoPrefixer({
          grid: "autoplace",
          cascade: false,
        })
      )
      .pipe(
        gulpIf(
          app.mode === "production",
          mincss({
            format: "beautify",
            level: 2,
          })
        )
      )
      .pipe(
        gulpIf(app.mode === "production", app.gulp.dest(app.paths.dist.css))
      )
      .pipe(
        mincss({
          level: {
            1: {
              all: true,
              specialComments: false,
            },
          },
        })
      )
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(
        app.gulp.dest(app.paths.dist.css, {
          sourcemaps: app.mode === "development" ? true : false,
        })
      )
      .on("end", () => {
        if (app.mode === "development") {
          app.plugins.browserSync.reload();
        }
      })
  );
};
