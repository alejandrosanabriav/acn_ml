<?php
$dir_base = str_replace('apis', '', __DIR__);
require $dir_base . '/vendor/autoload.php';
use GeoIp2\Database\Reader;

function get_location($ip) {
	$dir_base = str_replace('apis', '', __DIR__);	
	try {
		
		$reader = new Reader($dir_base .'/GeoLite2-Country.mmdb');
		return $reader->country($ip);

	} catch(Exception $e) {
		return $dir_base;
	}
}


