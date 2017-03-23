define('node_modules/react-router/lib/hashHistory', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _createHashHistory = require('node_modules/history/lib/createHashHistory');
  
  var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
  
  var _createRouterHistory = require('node_modules/react-router/lib/createRouterHistory');
  
  var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
  module.exports = exports['default'];

});
