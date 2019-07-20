const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/user', require('./user'));
  app.use('/removal', require('./removal'));
  app.use('/company', require('./company'));
};

module.exports = RouteManager;