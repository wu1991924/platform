define('node_modules/echarts/lib/layout/barGrid', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var numberUtil = require('node_modules/echarts/lib/util/number');
      var parsePercent = numberUtil.parsePercent;
  
      function getSeriesStackId(seriesModel) {
          return seriesModel.get('stack') || '__ec_stack_' + seriesModel.seriesIndex;
      }
  
      function getAxisKey(axis) {
          return axis.dim + axis.index;
      }
  
      function calBarWidthAndOffset(barSeries, api) {
          // Columns info on each category axis. Key is cartesian name
          var columnsMap = {};
  
          zrUtil.each(barSeries, function (seriesModel, idx) {
              var data = seriesModel.getData();
              var cartesian = seriesModel.coordinateSystem;
  
              var baseAxis = cartesian.getBaseAxis();
              var axisExtent = baseAxis.getExtent();
              var bandWidth = baseAxis.type === 'category'
                  ? baseAxis.getBandWidth()
                  : (Math.abs(axisExtent[1] - axisExtent[0]) / data.count());
  
              var columnsOnAxis = columnsMap[getAxisKey(baseAxis)] || {
                  bandWidth: bandWidth,
                  remainedWidth: bandWidth,
                  autoWidthCount: 0,
                  categoryGap: '20%',
                  gap: '30%',
                  stacks: {}
              };
              var stacks = columnsOnAxis.stacks;
              columnsMap[getAxisKey(baseAxis)] = columnsOnAxis;
  
              var stackId = getSeriesStackId(seriesModel);
  
              if (!stacks[stackId]) {
                  columnsOnAxis.autoWidthCount++;
              }
              stacks[stackId] = stacks[stackId] || {
                  width: 0,
                  maxWidth: 0
              };
  
              var barWidth = parsePercent(
                  seriesModel.get('barWidth'), bandWidth
              );
              var barMaxWidth = parsePercent(
                  seriesModel.get('barMaxWidth'), bandWidth
              );
              var barGap = seriesModel.get('barGap');
              var barCategoryGap = seriesModel.get('barCategoryGap');
              // TODO
              if (barWidth && !stacks[stackId].width) {
                  barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
                  stacks[stackId].width = barWidth;
                  columnsOnAxis.remainedWidth -= barWidth;
              }
  
              barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
              (barGap != null) && (columnsOnAxis.gap = barGap);
              (barCategoryGap != null) && (columnsOnAxis.categoryGap = barCategoryGap);
          });
  
          var result = {};
  
          zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {
  
              result[coordSysName] = {};
  
              var stacks = columnsOnAxis.stacks;
              var bandWidth = columnsOnAxis.bandWidth;
              var categoryGap = parsePercent(columnsOnAxis.categoryGap, bandWidth);
              var barGapPercent = parsePercent(columnsOnAxis.gap, 1);
  
              var remainedWidth = columnsOnAxis.remainedWidth;
              var autoWidthCount = columnsOnAxis.autoWidthCount;
              var autoWidth = (remainedWidth - categoryGap)
                  / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
              autoWidth = Math.max(autoWidth, 0);
  
              // Find if any auto calculated bar exceeded maxBarWidth
              zrUtil.each(stacks, function (column, stack) {
                  var maxWidth = column.maxWidth;
                  if (!column.width && maxWidth && maxWidth < autoWidth) {
                      maxWidth = Math.min(maxWidth, remainedWidth);
                      remainedWidth -= maxWidth;
                      column.width = maxWidth;
                      autoWidthCount--;
                  }
              });
  
              // Recalculate width again
              autoWidth = (remainedWidth - categoryGap)
                  / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
              autoWidth = Math.max(autoWidth, 0);
  
              var widthSum = 0;
              var lastColumn;
              zrUtil.each(stacks, function (column, idx) {
                  if (!column.width) {
                      column.width = autoWidth;
                  }
                  lastColumn = column;
                  widthSum += column.width * (1 + barGapPercent);
              });
              if (lastColumn) {
                  widthSum -= lastColumn.width * barGapPercent;
              }
  
              var offset = -widthSum / 2;
              zrUtil.each(stacks, function (column, stackId) {
                  result[coordSysName][stackId] = result[coordSysName][stackId] || {
                      offset: offset,
                      width: column.width
                  };
  
                  offset += column.width * (1 + barGapPercent);
              });
          });
  
          return result;
      }
  
      /**
       * @param {string} seriesType
       * @param {module:echarts/model/Global} ecModel
       * @param {module:echarts/ExtensionAPI} api
       */
      function barLayoutGrid(seriesType, ecModel, api) {
  
          var barWidthAndOffset = calBarWidthAndOffset(
              zrUtil.filter(
                  ecModel.getSeriesByType(seriesType),
                  function (seriesModel) {
                      return !ecModel.isSeriesFiltered(seriesModel)
                          && seriesModel.coordinateSystem
                          && seriesModel.coordinateSystem.type === 'cartesian2d';
                  }
              )
          );
  
          var lastStackCoords = {};
  
          ecModel.eachSeriesByType(seriesType, function (seriesModel) {
  
              var data = seriesModel.getData();
              var cartesian = seriesModel.coordinateSystem;
              var baseAxis = cartesian.getBaseAxis();
  
              var stackId = getSeriesStackId(seriesModel);
              var columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId];
              var columnOffset = columnLayoutInfo.offset;
              var columnWidth = columnLayoutInfo.width;
              var valueAxis = cartesian.getOtherAxis(baseAxis);
  
              var barMinHeight = seriesModel.get('barMinHeight') || 0;
  
              var valueAxisStart = baseAxis.onZero
                  ? valueAxis.toGlobalCoord(valueAxis.dataToCoord(0))
                  : valueAxis.getGlobalExtent()[0];
  
              var coords = cartesian.dataToPoints(data, true);
              lastStackCoords[stackId] = lastStackCoords[stackId] || [];
  
              data.setLayout({
                  offset: columnOffset,
                  size: columnWidth
              });
              data.each(valueAxis.dim, function (value, idx) {
                  // 空数据
                  if (isNaN(value)) {
                      return;
                  }
                  if (!lastStackCoords[stackId][idx]) {
                      lastStackCoords[stackId][idx] = {
                          // Positive stack
                          p: valueAxisStart,
                          // Negative stack
                          n: valueAxisStart
                      };
                  }
                  var sign = value >= 0 ? 'p' : 'n';
                  var coord = coords[idx];
                  var lastCoord = lastStackCoords[stackId][idx][sign];
                  var x, y, width, height;
                  if (valueAxis.isHorizontal()) {
                      x = lastCoord;
                      y = coord[1] + columnOffset;
                      width = coord[0] - lastCoord;
                      height = columnWidth;
  
                      if (Math.abs(width) < barMinHeight) {
                          width = (width < 0 ? -1 : 1) * barMinHeight;
                      }
                      lastStackCoords[stackId][idx][sign] += width;
                  }
                  else {
                      x = coord[0] + columnOffset;
                      y = lastCoord;
                      width = columnWidth;
                      height = coord[1] - lastCoord;
                      if (Math.abs(height) < barMinHeight) {
                          // Include zero to has a positive bar
                          height = (height <= 0 ? -1 : 1) * barMinHeight;
                      }
                      lastStackCoords[stackId][idx][sign] += height;
                  }
  
                  data.setItemLayout(idx, {
                      x: x,
                      y: y,
                      width: width,
                      height: height
                  });
              }, true);
  
          }, this);
      }
  
      module.exports = barLayoutGrid;
  

});
