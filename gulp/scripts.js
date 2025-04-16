import { rollup } from "rollup";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import cssnanoPlugin from "cssnano";
import autoprefixer from "autoprefixer";
import combineMediaQuery from "postcss-combine-media-query";

export const scriptsTask = async () => {
  const appBundle = await rollup({
    input: app.paths.appJs.src,
    plugins: [
      commonjs(),
      nodeResolve(),
      app.mode === "production"
        ? babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**",
          })
        : "",
    ],
  });

  await appBundle.write({
    sourcemap: app.mode === "development" ? true : false,
    format: "iife",
    dir: app.paths.appJs.dist,
    entryFileNames: "app.js",
  });

  const libsBundle = await rollup({
    input: app.paths.libsJs.src,
    plugins: [
      commonjs(),
      nodeResolve(),
      app.mode === "production"
        ? babel({
            babelHelpers: "bundled",
            exclude: "node_modules/**",
          })
        : "",
      app.mode === "production" ? terser() : "",
      postcss({
        plugins: [
          combineMediaQuery(),
          autoprefixer({
            grid: "autoplace",
            cascade: false,
          }),
          cssnanoPlugin({
            preset: "default",
          }),
        ],
        extract: "css/libs.min.css",
        extensions: [".css", ".scss"],
      }),
    ],
  });

  await libsBundle.write({
    sourcemap: app.mode === "development" ? true : false,
    format: "iife", // Выходной формат файла
    dir: app.paths.dist, // Расположение выходного файла
    entryFileNames: "js/libs.min.js", // Название выходного файла
  });

  if (app.mode === "development") {
    return app.browserSync.reload();
  }
};
