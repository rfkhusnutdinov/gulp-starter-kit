import GulpFormatHtml from "gulp-format-html";
import GulpPug from "gulp-pug";
import gulpIf from "gulp-if";

export const htmlTask = () => {
  return app.gulp
    .src(app.paths.src.html)
    .pipe(GulpPug())
    .pipe(
      gulpIf(
        app.mode === "production",
        GulpFormatHtml({
          indent_size: 2,
          preserve_newlines: false,
          indent_char: " ",
          editorconfig: true,
          end_with_newline: true,
          wrap_line_length: 0,
        })
      )
    )
    .pipe(app.gulp.dest(app.paths.dist.html))
    .on("end", () => {
      if (app.mode === "development") {
        app.plugins.browserSync.reload();
      }
    });
};
