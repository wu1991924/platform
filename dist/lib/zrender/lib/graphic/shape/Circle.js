define('node_modules/zrender/lib/graphic/shape/Circle', function(require, exports, module) {

  'use strict';
  /**
   * 圆形
   * @module zrender/shape/Circle
   */
  
  
  
      module.exports = require('node_modules/zrender/lib/graphic/Path').extend({
  
          type: 'circle',
  
          shape: {
              cx: 0,
              cy: 0,
              r: 0
          },
  
  
          buildPath : function (ctx, shape, inBundle) {
              // Better stroking in ShapeBundle
              // Always do it may have performence issue ( fill may be 2x more cost)
              if (inBundle) {
                  ctx.moveTo(shape.cx + shape.r, shape.cy);
              }
              // Better stroking in ShapeBundle
              // ctx.moveTo(shape.cx + shape.r, shape.cy);
              ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
          }
      });
  
  

});
