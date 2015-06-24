<?php
	function Flag($http_server, $params = array()) {
		$content = file_get_contents($http_server);
		return $content;
	}

	$http = '';
	$response = Flag($http);

	if ($response) {
		echo $response;
	}

?>