# angular-sku

demo：http://codepen.io/hzxs1990225/pen/VYyOdW
专栏：http://www.html-js.com/article/2681

In your web page:

```html
<div ui-sku split-str="#" init-sku="M#红色#男" sku-data="skuInfo" on-ok="callback($event)">
 <div class="row f-cb">
   <div class="l-col">尺码</div>
   <div class="r-col">
     <ul class="m-sku f-cb">
       <li><span ng-class="{'js-seleted': keyMap['S'].selected, 'js-disabled': keyMap['S'].disabled}" ng-click="onSelect('S')">S</span></li>
       <li><span ng-class="{'js-seleted': keyMap['M'].selected, 'js-disabled': keyMap['M'].disabled}" ng-click="onSelect('M')">M</span></li>
       ...
     </ul>
   </div>
   ...
 </div>
</div>

<script src="angular.js"></script>
<script src="dist/angular-sku.min.js"></script>
<script>
var myapp = angular.module('skuApp', ['ui.angularSku']);

myapp.controller('skuController', function ($scope) {
  'use strict';
  $scope.type = 'parent';
  $scope.callback = function(count){
    $scope.count = count;
  }
  $scope.skuInfo = {

    'S#红色#男': {
      count: 0
    },
    'S#红色#女': {
      count: 0
    },
    ...
  }
});
```

组件接收4个参数skuData，splitStr，initSku，onOk

- skuData为组件结接收的数据(数据有一定格式，需要后台开发配合给)
   
         {
            'S#红色#男': {
              count: 0
            },
            'M#红色#女': {
              count: 0
            },
            'S#橙色#男': {
              count: 1
            },
           'M#橙色#女': {
              count: 1
            },
            .....
          }
- splitStr为不同key之间的分格缝（S#红色#男中指的是‘#’）
- initSku为默认设置的选中key（可以设置为M#红色#女）
- onOk点击key之后的callback（callback接受的参数为选择sku组合（例如'S#橙色#男'）对应的值）
@support IE>=8

