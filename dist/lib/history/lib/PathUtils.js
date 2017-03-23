define('node_modules/history/lib/PathUtils', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  exports.extractPath = extractPath;
  exports.parsePath = parsePath;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _warning = require('node_modules/history/node_modules/warning/browser');
  
  var _warning2 = _interopRequireDefault(_warning);
  
  function extractPath(string) {
    var match = string.match(/^https?:\/\/[^\/]*/);
  
    if (match == null) return string;
  
    return string.substring(match[0].length);
  }
  
  function parsePath(path) {
    var pathname = extractPath(path);
    var search = '';
    var hash = '';
  
    'development' !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
  
    var hashIndex = pathname.indexOf('#');
    if (hashIndex !== -1) {
      hash = pathname.substring(hashIndex);
      pathname = pathname.substring(0, hashIndex);
    }
  
    var searchIndex = pathname.indexOf('?');
    if (searchIndex !== -1) {
      search = pathname.substring(searchIndex);
      pathname = pathname.substring(0, searchIndex);
    }
  
    if (pathname === '') pathname = '/';
  
    return {
      pathname: pathname,
      search: search,
      hash: hash
    };
  }

});
