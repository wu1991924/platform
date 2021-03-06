define('node_modules/add-dom-event-listener/lib/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = addEventListener;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _EventObject = require('node_modules/add-dom-event-listener/lib/EventObject');
  
  var _EventObject2 = _interopRequireDefault(_EventObject);
  
  function addEventListener(target, eventType, callback) {
    function wrapCallback(e) {
      var ne = new _EventObject2['default'](e);
      callback.call(target, ne);
    }
  
    if (target.addEventListener) {
      target.addEventListener(eventType, wrapCallback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, wrapCallback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, wrapCallback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, wrapCallback);
        }
      };
    }
  }
  
  module.exports = exports['default'];

});
