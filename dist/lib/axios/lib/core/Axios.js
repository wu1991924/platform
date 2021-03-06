define('node_modules/axios/lib/core/Axios', function(require, exports, module) {

  'use strict';
  
  var defaults = require('node_modules/axios/lib/defaults');
  var utils = require('node_modules/axios/lib/utils');
  var InterceptorManager = require('node_modules/axios/lib/core/InterceptorManager');
  var dispatchRequest = require('node_modules/axios/lib/core/dispatchRequest');
  var isAbsoluteURL = require('node_modules/axios/lib/helpers/isAbsoluteURL');
  var combineURLs = require('node_modules/axios/lib/helpers/combineURLs');
  
  /**
   * Create a new instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   */
  function Axios(defaultConfig) {
    this.defaults = utils.merge(defaults, defaultConfig);
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  
  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = utils.merge({
        url: arguments[0]
      }, arguments[1]);
    }
  
    config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  
    // Support baseURL config
    if (config.baseURL && !isAbsoluteURL(config.url)) {
      config.url = combineURLs(config.baseURL, config.url);
    }
  
    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);
  
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
  
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
  
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
  
    return promise;
  };
  
  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });
  
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });
  
  module.exports = Axios;
  

});
