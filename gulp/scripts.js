import { rollup } from "rollup";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import cssnanoPlugin from "cssnano";
import autoprefixer from "autoprefixer";
// import combineMediaQuery from "postcss-combine-media-query";

export const scriptsTask = async () => {
  // Сборка app.js
  const appBundle = await rollup({
    input: app.paths.src.appJs, // Входной файл
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
    sourcemap: app.mode === "development" ? true : false, // Sourcemap
    format: "iife", // Выходной формат файла
    dir: app.paths.dist.js, // Расположение выходного файла
    entryFileNames: "js/app.js", // Название выходного файла
  });

  // Сборка libs.js
  const libsBundle = await rollup({
    input: app.paths.src.libsJs, // Входной файл
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
          // combineMediaQuery(),
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
    dir: app.paths.dist.js, // Расположение выходного файла
    entryFileNames: "js/libs.min.js", // Название выходного файла
  });

  if (app.mode === "development") {
    return app.plugins.browserSync.reload();
  }
};
