(function (app) {
  'use strict';

  app.registerModule('mealPlanner', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('articles.admin', ['core.admin']);
  // app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('mealPlanner.services');
  app.registerModule('mealPlanner.routes', ['ui.router', 'core.routes', 'mealPlanner.services']);
}(ApplicationConfiguration));
