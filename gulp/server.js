export const serverTask = () => {
  app.browserSync.init({
    server: app.paths.dist.watch,
    notify: false,
    ui: false,
  });
};
