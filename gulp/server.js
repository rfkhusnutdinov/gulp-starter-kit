export const serverTask = () => {
  app.plugins.browserSync.init({
    server: "./dist/",
    notify: false,
    ui: false,
  });
};
