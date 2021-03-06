define('node_modules/echarts/lib/component/brush/BrushView', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var BrushController = require('node_modules/echarts/lib/component/helper/BrushController');
      var echarts = require('node_modules/echarts/lib/echarts');
      var brushHelper = require('node_modules/echarts/lib/component/helper/brushHelper');
  
      module.exports = echarts.extendComponentView({
  
          type: 'brush',
  
          init: function (ecModel, api) {
  
              /**
               * @readOnly
               * @type {module:echarts/model/Global}
               */
              this.ecModel = ecModel;
  
              /**
               * @readOnly
               * @type {module:echarts/ExtensionAPI}
               */
              this.api = api;
  
              /**
               * @readOnly
               * @type {module:echarts/component/brush/BrushModel}
               */
              this.model;
  
              /**
               * @private
               * @type {module:echarts/component/helper/BrushController}
               */
              (this._brushController = new BrushController(api.getZr()))
                  .on('brush', zrUtil.bind(this._onBrush, this))
                  .mount();
          },
  
          /**
           * @override
           */
          render: function (brushModel) {
              this.model = brushModel;
              return updateController.apply(this, arguments);
          },
  
          /**
           * @override
           */
          updateView: updateController,
  
          /**
           * @override
           */
          updateLayout: updateController,
  
          /**
           * @override
           */
          updateVisual: updateController,
  
          /**
           * @override
           */
          dispose: function () {
              this._brushController.dispose();
          },
  
          /**
           * @private
           */
          _onBrush: function (areas, opt) {
              var modelId = this.model.id;
  
              brushHelper.parseOutputRanges(areas, this.model.coordInfoList, this.ecModel);
  
              // Action is not dispatched on drag end, because the drag end
              // emits the same params with the last drag move event, and
              // may have some delay when using touch pad, which makes
              // animation not smooth (when using debounce).
              (!opt.isEnd || opt.removeOnClick) && this.api.dispatchAction({
                  type: 'brush',
                  brushId: modelId,
                  areas: zrUtil.clone(areas),
                  $from: modelId
              });
          }
  
      });
  
      function updateController(brushModel, ecModel, api, payload) {
          // Do not update controller when drawing.
          (!payload || payload.$from !== brushModel.id) && this._brushController
              .setPanels(brushHelper.makePanelOpts(brushModel.coordInfoList))
              .enableBrush(brushModel.brushOption)
              .updateCovers(brushModel.areas.slice());
      }
  
  

});
