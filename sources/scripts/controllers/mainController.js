app.controller('mainController', function($sce, $rootScope, $scope, $http, $document, $timeout) {
	$scope.photos = new Array()

	function complete (response) {
		$scope.photos = response.data;

		$timeout(function () {
			$('.owl-carousel').owlCarousel({
				loop: true,
				items: 1,
				autoplay: true,
				autoplayTimeout: 4000
			});
		});
	}

	$http.get('api.php').success(complete);
});