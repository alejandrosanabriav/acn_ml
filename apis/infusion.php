<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function infusion_create_contact() {
    
}


function infusion_get_countries_tags($country = '') {
	$countries = [
    'Australia' => '822',
    'Austria' => '824',
    'Belgium' => '826',
    'Brazil' => '828',
    'Canada' => '830',
    'Chile' => '832',
    'Colombia' => '834',
    'France' => '836',
    'Germany' => '838',
    'Ireland' => '840',
    'Italy' => '842',
    'Malta' => '844',
    'Mexico' => '846',
    'Netherlands' => '848',
    'Philippines' => '850',
    'Poland' => '852',
    'Portugal' => '854',
    'Slovakia' => '856',
    'Republic of Korea' => '858',
    'Spain' => '860',
    'Switzerland' => '862'
  ];

	return array_key_exists($country, $countryTags) ? [$countryTags[$country]] : [];
}

function get_arr($str_to_explode = '', $default = '') {
	if(!empty($str_to_explode)) {
		return explode(',', $str_to_explode);
	} else {
		return [$default];
	}
}