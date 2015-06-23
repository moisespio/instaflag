<?php
	function Flag($http_server, $params = array()) {
		$content = file_get_contents($http_server);
		return $content;
	}

	$http = 'https://api.instagram.com/v1/tags/agenciaescala/media/recent?callback=?&client_id=4161e7120cfb45979576eba99b85119f';
	$response = Flag($http);

	if ($response) {
		echo $response;
	}

?>