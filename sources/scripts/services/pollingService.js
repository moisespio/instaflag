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
