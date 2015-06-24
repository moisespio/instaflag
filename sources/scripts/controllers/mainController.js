app.controller('mainController', function($rootScope, $scope, pollingService) {
	$scope.photos = [];

    pollingService.then(
        function () {},
        function () {},
        function (data) {
            console.log('notify');
            console.log(data);
        }
    );

	/*function complete (response) {
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

	$http.get('api.php').success(complete);*/
});
