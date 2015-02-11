(function() {
  angular.module('ui.angularSku', [])
    .constant('skuConfig', {
    })
    .factory('utilService', function(){
      var key_account_Map = {},
        keys = [];

      /**
       * 数组去重
       * @param a {Array}
       * @returns {Array}
       */
      return {
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
         * 获取sku规格
         * @param a {Array}
         * @returns {Array}
         */
        getKeys: function(a){
          var ta = this.transpose(a),
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

          items = key.split(";");

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
                result += this.getNum(n.concat(keys[i][m], items).join(";"));
              }
              break;
            }
          }

          //缓存
          key_account_Map[key] = result;
          return result;
        }
      }
    })
    .directive('uiSku', ['skuConfig', 'utilService', function(skuConfig, utilService){
      return{
        restrict: 'A',
        transclude: true,
        scope: {},
        controller: function($scope, $element, $attrs, utilService) {
          // 设置选中
          this.checkIn = function(key) {
            $scope.accept();
          };
        },
        link: function(scope, element, attrs, ctrls, transclude) {
          // 手动设置transclude,解决用ng-transclude scope作用域问题
          // https://gist.github.com/meanJim/1c3339bde5cbeac6417d
          transclude(scope, function(clone){
            element.append(clone);
          });
          scope.keyMap = {'S':{}, 'M':{}};
          scope.keyMap['S'].selected = true;
          scope.keyMap['M'].disabled = true;
          scope.onKeyClick = function(key, index){
            var keyMap = scope.keyMap;
            if(!!keyMap[key] && !keyMap[key].disabled) return;
            debugger;
          }
        }
      }
    }])
})();