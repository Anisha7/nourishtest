(function (app) {
  'use strict';

  app.registerModule('myHealth', ['core']);
  app.registerModule('myHealth.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
