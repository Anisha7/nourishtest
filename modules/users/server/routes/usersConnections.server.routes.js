'use strict';

module.exports = function (app) {
  // User Routes
  var userConnections = require('../controllers/users/usersConnections.server.controller');

  // Setting up the users profile api
  app.route('/api/connections/search')
    .get(userConnections.searchUser);

  app.route('/api/connections/add')
    .get(userConnections.pendingRequests)
    .put(userConnections.removeUser)
    .post(userConnections.sendOrRespondToRequest);

  // app.route('/api/connections/accept')
  //   .get(userConnections.pendingRequests)
  //   .post(userConnections.requestResponse);
  // Finish by binding the user middleware
  // app.param('userId', users.userByID);
};
