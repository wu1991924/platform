define('node_modules/react/lib/ReactDOMInstrumentation', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMInstrumentation
   */
  
  'use strict';
  
  var debugTool = null;
  
  if ('development' !== 'production') {
    var ReactDOMDebugTool = require('node_modules/react/lib/ReactDOMDebugTool');
    debugTool = ReactDOMDebugTool;
  }
  
  module.exports = { debugTool: debugTool };

});
