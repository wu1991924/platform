define('node_modules/zrender/lib/contain/util', function(require, exports, module) {

  
  
      var PI2 = Math.PI * 2;
      module.exports = {
          normalizeRadian: function(angle) {
              angle %= PI2;
              if (angle < 0) {
                  angle += PI2;
              }
              return angle;
          }
      };
  

});
