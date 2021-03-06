define('node_modules/fbjs/lib/performanceNow', function(require, exports, module) {

  'use strict';
  
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */
  
  var performance = require('node_modules/fbjs/lib/performance');
  
  var performanceNow;
  
  /**
   * Detect if we can use `window.performance.now()` and gracefully fallback to
   * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
   * because of Facebook's testing infrastructure.
   */
  if (performance.now) {
    performanceNow = function performanceNow() {
      return performance.now();
    };
  } else {
    performanceNow = function performanceNow() {
      return Date.now();
    };
  }
  
  module.exports = performanceNow;

});
