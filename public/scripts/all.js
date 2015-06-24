var app = angular.module('app', []);

app.factory('pollingService', function ($http, $timeout, $q) {

	var data,
		deferred = $q.defer();

	(function poll() {
		$http.jsonp('https://api.instagram.com/v1/tags/testandoapp/media/recent?callback=?&client_id=4161e7120cfb45979576eba99b85119f&callback=JSON_CALLBACK').success(function(response) {
			deferred.notify(response.data);
			$timeout(poll, 5000);
		});
	})();

	return deferred.promise;
});

app.controller('mainController', function($rootScope, $scope, $timeout, pollingService) {
	$scope.photos = [];

	var firstRequest = true,
		owl = $('.owl-carousel'),
		currentPhoto = 0,
		template = '<div class="owl-item"><div class="single"><div class="photo" style="background-image: url({ photo })"></div><span class="user">{ username }</span></div></div>',
		currentPhotos = [],
		newPhotos;

	function difference(array1, array2) {
		var diff = [];
		var has = false;

		for (var i = 0; i < array1.length; i++) {
			has = false;
			for (var j = 0; j < array2.length; j++) {
				if(array2[j].id === array1[i].id) {
					has = true;
				}
			};

			if (!has) {
				diff.push(array1[i]);
			}
		};

		return diff;
	}

	pollingService.then(
		function () {},
		function () {},
		function (response) {
			if (!angular.equals($scope.photos, response)) {
				if (firstRequest) {
					firstRequest = false;
					$scope.photos = response;

					$timeout(function () {
						owl.owlCarousel({
							loop: true,
							items: 1,
							autoplay: true,
							autoplayTimeout: 4000,
							afterAction : function () {
								console.log('after');
							}
						});

						owl.on('changed.owl.carousel', function(event) {
							currentPhoto = event.page.index;
						});
					});
				} else {
					console.log(currentPhotos, response);
					newPhotos = difference(response, currentPhotos);

					console.log("newPhotos:", newPhotos);

					for (var i = 0; i < newPhotos.length; i++) {
						owl.trigger('add.owl.carousel', [$(template.replace('{ photo }', newPhotos[i].images.standard_resolution.url).replace('{ username }', newPhotos[i].user.username)), currentPhoto + 1]).trigger('refresh.owl.carousel');
					};
				}

				currentPhotos = response;
			}
		}
	);
});
