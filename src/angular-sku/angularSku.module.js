(function() {
  angular.module('ui.angularSku', [])
    .value('skuConfig', {
      splitStr: ';'
    })
    .factory('utilService', ['$log','skuConfig', function($log, skuConfig){
      var key_account_Map = {},
        keys = [];

      return {
        /**
         * 数组去重
         * @param a {Array}
         * @returns {Array}
         */
        unique: function(a){
          var res = [];
          var json = {};
          for(var i = 0; i < a.length; i++){
            if(!json[a[i]]){
              res.push(a[i]);
              json[a[i]] = 1;
            }
          }
          return res;
        },

        /**
         * 矩阵转置前的2维素组
         */
        getSkuList: function(obj){
          var array = [];
          if(!obj) $log.error('input sku-data error!');
          angular.forEach(obj, function(value, key) {
            array.push(key.split(skuConfig.splitStr));
          });
          return array;
        },

        /**
         * 矩阵转置
         * http://geniuscarrier.com/transpose-in-javascript/
         * =====================
         *  |1 2 3|     |1 4 7|
         *  |4 5 6| ==> |2 5 8|
         *  |7 8 9|     |3 6 9|
         *======================
         */
        transpose: function(a) {
          var w = a.length ? a.length : 0,
            h = a[0] instanceof Array ? a[0].length : 0;
          if(h === 0 || w === 0) { return []; }
          var i, j, t = [];
          for(i=0; i<h; i++) {
            t[i] = [];
            for(j=0; j<w; j++) {
              t[i][j] = a[j][i];
            }
          }
          return t;
        },

        //transpose: function(a) {
        //  return Object.keys(a[0]).map(function (c) {
        //    return a.map(function (r) {
        //      return r[c];
        //    });
        //  });
        //};

        /**
         * 获取sku规格--2维数组
         * @param a {Array}
         * @returns {Array}
         */
        getKeys: function(obj){
          var list = this.getSkuList(obj),
            ta = this.transpose(list),
            r = [];
          for(var i=0; i<ta.length; i++){
            r[i] = this.unique(ta[i]);
          }
          keys = r;
          return keys;
        },

        /**
         * key对应的库存
         * @param key
         * @param data
         * @returns {*}
         */
        getNum: function(key, data){
          var result = 0,
            i, j, m,
            items, n = [];

          //检查是否已计算过
          if (typeof key_account_Map[key] != 'undefined') {
            return key_account_Map[key];
          }

          items = key.split(skuConfig.splitStr);

          //已选择数据是最小路径，直接从已端数据获取
          if (items.length === keys.length) {
            return data[key] ? data[key].count : 0;
          }

          //拼接子串
          for (i = 0; i < keys.length; i++) {
            for (j = 0; j < keys[i].length && items.length > 0; j++) {
              if (keys[i][j] == items[0]) {
                break;
              }
            }

            if (j < keys[i].length && items.length > 0) {
              //找到该项，跳过
              n.push(items.shift());
            } else {
              //分解求值
              for (m = 0; m < keys[i].length; m++) {
                result += this.getNum(n.concat(keys[i][m], items).join(skuConfig.splitStr));
              }
              break;
            }
          }

          //缓存
          key_account_Map[key] = result;
          return result;
        }
      }
    }])
    .directive('uiSku', ['$log', 'skuConfig', 'utilService', function($log, skuConfig, utilService){
      return{
        restrict: 'A',
        transclude: true,
        scope: {
          splitStr:'@',
          onOk: '&',
          skuData: '='
        },
        controller: function($scope, $element, $attrs) {
          // 设置选中
          this.checkIn = function(key) {
            $scope.accept();
          };

        },
        link: function(scope, element, attrs, ctrls, transclude) {
          if(!!scope.splitStr) skuConfig.splitStr = scope.splitStr;
          scope.keyMap = {};
          scope.selectedKeyArray = [];
          scope.keys = utilService.getKeys(scope.skuData);

          angular.forEach(scope.keys, function(array, i0){
            angular.forEach(array, function(value, i1) {
              scope.keyMap[value] = {
                name: value,
                selected: !1,
                disabled: !1
              }
            });
          });

          // 手动设置transclude,解决用ng-transclude scope作用域问题
          // https://gist.github.com/meanJim/1c3339bde5cbeac6417d
          transclude(scope, function(clone){
            element.append(clone);
          });

          scope.onKeyClick = function(key, index){
            var keyMap = scope.keyMap;
            if(keyMap[key].disabled) return;
            if(index == null){
              if(!obj) $log.error('input index error!');
              return;
            }
            scope.selectedKeyArray[index] = key;
            angular.forEach(scope.selectedKeyArray, function(value, i){

            });
          }
        }
      }
    }])
})();