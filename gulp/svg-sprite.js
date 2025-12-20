import gulpCheerio from "gulp-cheerio";
import gulpIf from "gulp-if";
import replace from "gulp-replace";
import svgSprite from "gulp-svg-sprite";
import GulpSvgmin from "gulp-svgmin";

export const svgSpriteTask = () => {
  return app.gulp
    .src(app.paths.sprite.src, { encoding: false })
    .pipe(
      GulpSvgmin({
        js2svg: {
          pretty: true,
        },
      }),
    )
    .pipe(
      gulpCheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
          $("[class]").removeAttr("class");
        },
        parserOptions: {
          xmlMode: true,
        },
      }),
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      }),
    )
    .pipe(app.gulp.dest(app.paths.sprite.dist))
    .pipe(gulpIf(app.mode === "development", app.browserSync.stream()));
};
