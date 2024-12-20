import svgSprite from "gulp-svg-sprite";
import GulpSvgmin from "gulp-svgmin";
import replace from "gulp-replace";
import gulpCheerio from "gulp-cheerio";

export const spriteTask = () => {
  return app.gulp
    .src(app.paths.src.svg)
    .pipe(
      GulpSvgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      gulpCheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.paths.dist.img))
    .pipe(app.plugins.browserSync.stream());
};
