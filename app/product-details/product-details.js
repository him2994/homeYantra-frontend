'use strict';

angular.module('myApp.productDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products/:productId', {
    templateUrl: 'product-details/product-details.html',
    controller: 'ProductDetailCtrl'
  });
}])

.controller('ProductDetailCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
	var model_name = $routeParams.productId;
	$http.get("https://secure-hamlet-73994.herokuapp.com/products/"+model_name+"/")
    .then(function(response) {
        $scope.product = response.data;
        $scope.url = $scope.product.img_hash.split("_")[0]
    });

    $scope.home = function() {
    	$location.path('/products');
    }
}]);