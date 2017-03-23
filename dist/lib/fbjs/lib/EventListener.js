define('node_modules/fbjs/lib/EventListener', function(require, exports, module) {

  'use strict';
  
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * @typechecks
   */
  
  var emptyFunction = require('node_modules/fbjs/lib/emptyFunction');
  
  /**
   * Upstream version of event listener. Does not take into account specific
   * nature of platform.
   */
  var EventListener = {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {DOMEventTarget} target DOM element to register listener on.
     * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback Callback function.
     * @return {object} Object with a `remove` method.
     */
    listen: function listen(target, eventType, callback) {
      if (target.addEventListener) {
        target.addEventListener(eventType, callback, false);
        return {
          remove: function remove() {
            target.removeEventListener(eventType, callback, false);
          }
        };
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, callback);
        return {
          remove: function remove() {
            target.detachEvent('on' + eventType, callback);
          }
        };
      }
    },
  
    /**
     * Listen to DOM events during the capture phase.
     *
     * @param {DOMEventTarget} target DOM element to register listener on.
     * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback Callback function.
     * @return {object} Object with a `remove` method.
     */
    capture: function capture(target, eventType, callback) {
      if (target.addEventListener) {
        target.addEventListener(eventType, callback, true);
        return {
          remove: function remove() {
            target.removeEventListener(eventType, callback, true);
          }
        };
      } else {
        if ('development' !== 'production') {
          console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
        }
        return {
          remove: emptyFunction
        };
      }
    },
  
    registerDefault: function registerDefault() {}
  };
  
  module.exports = EventListener;

});
