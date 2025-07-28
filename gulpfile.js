import gulp from "gulp";
import argv from "yargs";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";

const env = argv(process.argv.slice(2)).argv.production
  ? "production"
  : "development";

const paths = {
  dist: {
    dist: "dist",
    watch: "dist",
  },
  html: {
    src: "src/templates/*.pug",
    watch: "src/templates/**/*.pug",
    dist: "dist",
  },
  scss: {
    src: "src/scss/*.scss",
    watch: "src/scss/**/*.scss",
    dist: "dist/css",
  },
  appJs: {
    src: "src/js/app.js",
    dist: "dist/js",
    watch: "src/js/**/*.js",
  },
  libsJs: {
    src: "src/js/libs.js",
    dist: "dist",
    watch: "src/js/**/*.js",
  },
  images: {
    src: "src/images/**/*.{png,jpg,jpeg,gif,svg,webp,ico,xml,webmanifest,mp4}",
    dist: "dist/images",
    watch:
      "src/images/**/*.{png,jpg,jpeg,gif,svg,webp,ico,xml,webmanifest,mp4}",
  },
  fonts: {
    src: "src/fonts/*.{woff,woff2}",
    dist: "dist/fonts",
    watch: "src/fonts/*.{woff,woff2}",
  },
  misc: {
    src: "src/misc/**/*.*",
    dist: "dist",
    watch: "src/misc/**/*.*",
  },
};

globalThis.app = {
  paths,
  gulp,
  plumber,
  browserSync,
  mode: env,
};

import { cleanTask } from "./gulp/clean.js";
import { fontsTask } from "./gulp/fonts.js";
import { htmlTask } from "./gulp/html.js";
import { stylesTask } from "./gulp/styles.js";
import { scriptsTask } from "./gulp/scripts.js";
import { imagesTask } from "./gulp/images.js";
import { miscTask } from "./gulp/misc.js";
import { serverTask } from "./gulp/server.js";

const watcher = async () => {
  gulp.watch(paths.html.watch, htmlTask);
  gulp.watch(paths.scss.watch, stylesTask);
  gulp.watch(paths.fonts.watch, fontsTask);
  gulp.watch(paths.images.watch, imagesTask);
  gulp.watch(paths.appJs.watch, scriptsTask);
  gulp.watch(paths.misc.watch, miscTask);
};

const tasks = gulp.series(
  cleanTask,
  gulp.parallel(
    htmlTask,
    stylesTask,
    scriptsTask,
    imagesTask,
    fontsTask,
    miscTask
  ),
  env == "development"
    ? gulp.parallel(serverTask, watcher)
    : gulp.parallel(miscTask)
);

export { htmlTask };
export { stylesTask };
export { fontsTask };
export { imagesTask };
export { scriptsTask };
export { miscTask };

export default tasks;
