export const paths = {
  src: {
    html: "src/templates/*.html",
    scss: "src/scss/*.scss",
    appJs: "src/js/app.js",
    libsJs: "src/js/libs.js",
    assets:
      "src/assets/**/*.{png,jpg,jpeg,gif,svg,webp,ico,xml,webmanifest,mp4}",
    fonts: "src/fonts/*.{woff2}",
    svg: "src/svg/*.svg",
    misc: "src/misc/**/*.*",
  },
  dist: {
    html: "dist",
    css: "dist/css",
    js: "dist",
    assets: "dist/assets",
    fonts: "dist/fonts",
    misc: "dist",
    clean: "dist/**",
  },
  watch: {
    all: "dist",
    html: "src/templates/**/*.html",
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    assets:
      "src/assets/**/*.{png,jpg,jpeg,gif,svg,webp,ico,xml,webmanifest,mp4}",
    fonts: "src/fonts/*.{woff2}",
    svg: "src/svg/*.svg",
    misc: "src/misc/**/*.*",
  },
};
