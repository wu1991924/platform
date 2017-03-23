define('node_modules/fbjs/lib/createNodesFromMarkup', function(require, exports, module) {

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
  
  /*eslint-disable fb-www/unsafe-html*/
  
  var ExecutionEnvironment = require('node_modules/fbjs/lib/ExecutionEnvironment');
  
  var createArrayFromMixed = require('node_modules/fbjs/lib/createArrayFromMixed');
  var getMarkupWrap = require('node_modules/fbjs/lib/getMarkupWrap');
  var invariant = require('node_modules/fbjs/lib/invariant');
  
  /**
   * Dummy container used to render all markup.
   */
  var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  
  /**
   * Pattern used by `getNodeName`.
   */
  var nodeNamePattern = /^\s*<(\w+)/;
  
  /**
   * Extracts the `nodeName` of the first element in a string of markup.
   *
   * @param {string} markup String of markup.
   * @return {?string} Node name of the supplied markup.
   */
  function getNodeName(markup) {
    var nodeNameMatch = markup.match(nodeNamePattern);
    return nodeNameMatch && nodeNameMatch[1].toLowerCase();
  }
  
  /**
   * Creates an array containing the nodes rendered from the supplied markup. The
   * optionally supplied `handleScript` function will be invoked once for each
   * <script> element that is rendered. If no `handleScript` function is supplied,
   * an exception is thrown if any <script> elements are rendered.
   *
   * @param {string} markup A string of valid HTML markup.
   * @param {?function} handleScript Invoked once for each rendered <script>.
   * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
   */
  function createNodesFromMarkup(markup, handleScript) {
    var node = dummyNode;
    !!!dummyNode ? 'development' !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : void 0;
    var nodeName = getNodeName(markup);
  
    var wrap = nodeName && getMarkupWrap(nodeName);
    if (wrap) {
      node.innerHTML = wrap[1] + markup + wrap[2];
  
      var wrapDepth = wrap[0];
      while (wrapDepth--) {
        node = node.lastChild;
      }
    } else {
      node.innerHTML = markup;
    }
  
    var scripts = node.getElementsByTagName('script');
    if (scripts.length) {
      !handleScript ? 'development' !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : void 0;
      createArrayFromMixed(scripts).forEach(handleScript);
    }
  
    var nodes = Array.from(node.childNodes);
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
    return nodes;
  }
  
  module.exports = createNodesFromMarkup;

});
