'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        'public/lib/angular-bootstrap-calendar-master/dist/css/angular-bootstrap-calendar.min.css',
        'public/lib/startbootstrap-simple-sidebar-master/css/simple-sidebar.css',
        'public/lib/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'public/lib/jasny-bootstrap/css/jasny-bootstrap.min.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/ui-router-extras/release/ct-ui-router-extras.js',
        'public/lib/moment-develop/moment.js',
        'public/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
        'public/lib/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/jasny-bootstrap/js/jasny-bootstrap.js'
        // 'public/lib/angular/angular.min.js',
        // 'public/lib/angular-animate/angular-animate.min.js',
        // 'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        // 'public/lib/angular-messages/angular-messages.min.js',
        // 'public/lib/angular-mocks/angular-mocks.js',
        // 'public/lib/angular-resource/angular-resource.min.js',
        // 'public/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
        // 'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        // 'public/lib/ng-file-upload/ng-file-upload.min.js',
        // 'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        // 'public/lib/moment-develop/moment.js',
        // 'public/lib/angular-bootstrap-calendar-master/dist/js/angular-bootstrap-calendar-tpls.js'

        // endbower
      ]
    },
    css: 'public/dist/application*.min.css',
    js: 'public/dist/application*.min.js'
  }
};
