define('node_modules/echarts/lib/coord/geo/fix/geoCoord', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      var geoCoordMap = {
          'Russia': [100, 60],
          'United States of America': [-99, 38]
      };
  
      module.exports = function (geo) {
          zrUtil.each(geo.regions, function (region) {
              var geoCoord = geoCoordMap[region.name];
              if (geoCoord) {
                  var cp = region.center;
                  cp[0] = geoCoord[0];
                  cp[1] = geoCoord[1];
              }
          });
      };
  

});
