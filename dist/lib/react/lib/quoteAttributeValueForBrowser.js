define('node_modules/react/lib/quoteAttributeValueForBrowser', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule quoteAttributeValueForBrowser
   */
  
  'use strict';
  
  var escapeTextContentForBrowser = require('node_modules/react/lib/escapeTextContentForBrowser');
  
  /**
   * Escapes attribute value to prevent scripting attacks.
   *
   * @param {*} value Value to escape.
   * @return {string} An escaped string.
   */
  function quoteAttributeValueForBrowser(value) {
    return '"' + escapeTextContentForBrowser(value) + '"';
  }
  
  module.exports = quoteAttributeValueForBrowser;

});
