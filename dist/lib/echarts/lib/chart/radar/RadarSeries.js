define('node_modules/echarts/lib/chart/radar/RadarSeries', function(require, exports, module) {

  'use strict';
  
  
      var SeriesModel = require('node_modules/echarts/lib/model/Series');
      var List = require('node_modules/echarts/lib/data/List');
      var completeDimensions = require('node_modules/echarts/lib/data/helper/completeDimensions');
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      var RadarSeries = SeriesModel.extend({
  
          type: 'series.radar',
  
          dependencies: ['radar'],
  
  
          // Overwrite
          init: function (option) {
              RadarSeries.superApply(this, 'init', arguments);
  
              // Enable legend selection for each data item
              // Use a function instead of direct access because data reference may changed
              this.legendDataProvider = function () {
                  return this._dataBeforeProcessed;
              };
          },
  
          getInitialData: function (option, ecModel) {
              var data = option.data || [];
              var dimensions = completeDimensions(
                  [], data, [], 'indicator_'
              );
              var list = new List(dimensions, this);
              list.initData(data);
              return list;
          },
  
          formatTooltip: function (dataIndex) {
              var value = this.getRawValue(dataIndex);
              var coordSys = this.coordinateSystem;
              var indicatorAxes = coordSys.getIndicatorAxes();
              return (this._data.getName(dataIndex) == '' ? this.name : this._data.getName(dataIndex)) + '<br/>'
                  + zrUtil.map(indicatorAxes, function (axis, idx) {
                      return axis.name + ' : ' + value[idx];
                  }).join('<br />');
          },
  
          defaultOption: {
              zlevel: 0,
              z: 2,
              coordinateSystem: 'radar',
              legendHoverLink: true,
              radarIndex: 0,
              lineStyle: {
                  normal: {
                      width: 2,
                      type: 'solid'
                  }
              },
              label: {
                  normal: {
                      position: 'top'
                  }
              },
              // areaStyle: {
              // },
              // itemStyle: {}
              symbol: 'emptyCircle',
              symbolSize: 4
              // symbolRotate: null
          }
      });
  
      module.exports = RadarSeries;
  

});
