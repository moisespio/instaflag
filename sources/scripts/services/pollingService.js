app.factory('pollingService', function ($http, $timeout, $q) {

    var data,
        deferred = $q.defer();

    (function poll() {
        $http
            .get('api.php')
            .success(function (response) {
                deferred.notify(response.data);
                $timeout(poll, 5000);
            });
    })();

    return deferred.promise;
});
