'use strict';

/**
 * Module dependencies
 */
var healthAdminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(healthAdminPolicy.isAllowed, admin.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(healthAdminPolicy.isAllowed, admin.read)
    .put(healthAdminPolicy.isAllowed, admin.update)
    .delete(healthAdminPolicy.isAllowed, admin.delete);

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
