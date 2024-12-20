import gulp from "gulp";
import argv from "yargs";

import { paths } from "./gulp/paths.js";
import { plugins } from "./gulp/plugins.js";

const env = argv(process.argv.slice(2)).argv.production
  ? "production"
  : "development";

// Глобальные переменные
global.app = {
  paths: paths,
  gulp: gulp,
  plugins: plugins,
  mode: env,
};

import { cleanTask } from "./gulp/clean.js";
import { fontsTask } from "./gulp/fonts.js";
import { htmlTask } from "./gulp/html.js";
import { stylesTask } from "./gulp/styles.js";
import { scriptsTask } from "./gulp/scripts.js";
import { imagesTask } from "./gulp/images.js";
import { miscTask } from "./gulp/misc.js";
// import { spriteTask } from "./gulp/sprite.js";
import { serverTask } from "./gulp/server.js";

// Наблюдатель за файлами
const watcher = async () => {
  gulp.watch(paths.watch.html, htmlTask);
  gulp.watch(paths.watch.scss, stylesTask);
  gulp.watch(paths.watch.fonts, fontsTask);
  // gulp.watch(paths.watch.svg, spriteTask);
  gulp.watch(paths.watch.img, imagesTask);
  gulp.watch(paths.watch.js, scriptsTask);
  gulp.watch(paths.watch.misc, miscTask);
};

// Gulp таски
const tasks = gulp.series(
  cleanTask,
  gulp.parallel(
    htmlTask,
    stylesTask,
    scriptsTask,
    imagesTask,
    fontsTask,
    miscTask
    // spriteTask
  ),
  env == "development"
    ? gulp.parallel(serverTask, watcher)
    : gulp.parallel(miscTask)
);

export default tasks;
