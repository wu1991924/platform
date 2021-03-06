define('node_modules/react-router/lib/browserHistory', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _createBrowserHistory = require('node_modules/history/lib/createBrowserHistory');
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createRouterHistory = require('node_modules/react-router/lib/createRouterHistory');
  
  var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
  module.exports = exports['default'];

});
