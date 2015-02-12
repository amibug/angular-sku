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
    'S#橙色#男': {
      count: 1
    },
    'S#橙色#女': {
      count: 1
    },
    'S#黄色#男': {
      count: 1
    },
    'S#黄色#女': {
      count: 1
    },
    'S#绿色#男': {
      count: 1
    },
    'S#绿色#女': {
      count: 1
    },
    'S#蓝色#男': {
      count: 0
    },
    'S#蓝色#女': {
      count: 11
    },
    'S#紫色#男': {
      count: 0
    },
    'S#紫色#女': {
      count: 41
    },

    'M#红色#男': {
      count: 19
    },
    'M#红色#女': {
      count: 2
    },
    'M#橙色#男': {
      count: 0
    },
    'M#橙色#女': {
      count: 0
    },
    'M#黄色#男': {
      count: 12
    },
    'M#黄色#女': {
      count: 1
    },
    'M#绿色#男': {
      count: 5
    },
    'M#绿色#女': {
      count: 1
    },
    'M#蓝色#男': {
      count: 0
    },
    'M#蓝色#女': {
      count: 87
    },
    'M#紫色#男': {
      count: 1
    },
    'M#紫色#女': {
      count: 21
    },

    'L#红色#男': {
      count: 98
    },
    'L#红色#女': {
      count: 100
    },
    'L#橙色#男': {
      count: 234
    },
    'L#橙色#女': {
      count: 7
    },
    'L#黄色#男': {
      count: 5
    },
    'L#黄色#女': {
      count: 9
    },
    'L#绿色#男': {
      count: 98
    },
    'L#绿色#女': {
      count: 0
    },
    'L#蓝色#男': {
      count: 13
    },
    'L#蓝色#女': {
      count: 21
    },
    'L#紫色#男': {
      count: 0
    },
    'L#紫色#女': {
      count: 1
    },


    'XL#红色#男': {
      count: 1
    },
    'XL#红色#女': {
      count: 1
    },
    'XL#橙色#男': {
      count: 1
    },
    'XL#橙色#女': {
      count: 1
    },
    'XL#黄色#男': {
      count: 1
    },
    'XL#黄色#女': {
      count: 1
    },
    'XL#绿色#男': {
      count: 1
    },
    'XL#绿色#女': {
      count: 1
    },
    'XL#蓝色#男': {
      count: 1
    },
    'XL#蓝色#女': {
      count: 1
    },
    'XL#紫色#男': {
      count: 1
    },
    'XL#紫色#女': {
      count: 1
    }
  }
});
