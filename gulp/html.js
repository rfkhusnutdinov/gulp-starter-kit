import GulpFormatHtml from "gulp-format-html";
import gulpIf from "gulp-if";
import fileinclude from "gulp-file-include";

export const htmlTask = () => {
  return app.gulp
    .src(app.paths.html.src)
    .pipe(fileinclude())
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
    .pipe(app.gulp.dest(app.paths.html.dist))
    .on("end", () => {
      if (app.mode === "development") {
        app.browserSync.reload();
      }
    });
};
