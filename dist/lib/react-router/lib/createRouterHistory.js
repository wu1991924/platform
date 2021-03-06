define('node_modules/react-router/lib/createRouterHistory', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  exports.default = function (createHistory) {
    var history = void 0;
    if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
    return history;
  };
  
  var _useRouterHistory = require('node_modules/react-router/lib/useRouterHistory');
  
  var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  
  module.exports = exports['default'];

});
