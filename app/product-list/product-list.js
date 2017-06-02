'use strict';

angular.module('myApp.productList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'product-list/product-list.html',
    controller: 'ProductListCtrl'
  });
}])

.controller('ProductListCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.showFilters = false;

    $scope.toggleFilters = function() {
        $scope.showFilters = !$scope.showFilters;
    }

	$http.get("https://secure-hamlet-73994.herokuapp.com/products/")
    .then(function(response) {
        console.log(response);
        $scope.products = response.data;
    });

    $scope.brands = [ 'Bosch', 'Daikin', 'Electrolux', 'Haier', 'Hitachi', 'IFB', 'LG', 'Lloyd', 'Onida', 'Panasonic', 'Philips', 'Samsung', 'Siemens', 'Sony', 'Videocon']

    $scope.home = function() {
        $location.path("/products");
    }

    $scope.submit = function(brand, pcategory, min_price, max_price) {
    	var query = "";
    	if (min_price > 0 ) {
    		 var q1 = 'min_price=' + min_price;
    	}
    	else {
    		var q1 = 'min_price=0'
    	}
    	query = query + q1 + '&';
    	if (max_price < 500000 && max_price > 0) {
    		var q2 = 'max_price=' + max_price;
    	}
    	else {
    		var q2 = 'max_price=500000'
    	}
    	query = query + q2 + '&';
    	if (brand != undefined && brand.length) {
    		var q3 = 'brand=';
    		for (var x=0; x<brand.length; x++) {
    			q3 = q3 + brand[x] + ',';
    		}
    		query = query + q3 + '&';
    	}
    	if (pcategory != undefined && pcategory.length) {
    		var q3 = 'pcategory=';
    		for (var x=0; x<pcategory.length; x++) {
    			q3 = q3 + pcategory[x] + ',';
    		}
    		query = query + q3 + '&';
    	}
    	$http.get("https://secure-hamlet-73994.herokuapp.com/products/?"+query)
	    .then(function(response) {
	        $scope.products = response.data;
	    });
    }

}]);

