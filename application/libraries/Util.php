<?php
class Util {
	function send_message($number = "", $message = ""){
		$url = 'https://www.itexmo.com/php_api/api.php';
		$apicode = 'TR-JUNJU676516_6A6FG';

		$post_body = array('1' => $number, '2' => $message, '3' => $apicode);
		$param = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'POST',
		        'content' => http_build_query($post_body),
		    ),
		);

		$context  = stream_context_create($param);
		return file_get_contents($url, false, $context);
	}

	public function generate_code($num) {
		$len = strlen($num);
		if ($len < 6) {
			for ($a=0; $a<6-$len; $a++) {
				$num = $num."0";
			}
		} else if ($len > 6) {
			$num = substr($num, $len - 6);
		}
		return mt_rand($num, 999999);
	}
}


?>