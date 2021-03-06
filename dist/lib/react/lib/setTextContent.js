define('node_modules/react/lib/setTextContent', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule setTextContent
   */
  
  'use strict';
  
  var ExecutionEnvironment = require('node_modules/fbjs/lib/ExecutionEnvironment');
  var escapeTextContentForBrowser = require('node_modules/react/lib/escapeTextContentForBrowser');
  var setInnerHTML = require('node_modules/react/lib/setInnerHTML');
  
  /**
   * Set the textContent property of a node, ensuring that whitespace is preserved
   * even in IE8. innerText is a poor substitute for textContent and, among many
   * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
   * as it should.
   *
   * @param {DOMElement} node
   * @param {string} text
   * @internal
   */
  var setTextContent = function (node, text) {
    if (text) {
      var firstChild = node.firstChild;
  
      if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  };
  
  if (ExecutionEnvironment.canUseDOM) {
    if (!('textContent' in document.documentElement)) {
      setTextContent = function (node, text) {
        setInnerHTML(node, escapeTextContentForBrowser(text));
      };
    }
  }
  
  module.exports = setTextContent;

});
