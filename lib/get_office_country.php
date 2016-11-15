<?php
include_once(get_template_directory() . '/lib/offices_countries.php');

  function getOfficeCountry() {
    $countries = getOfficesCountries();
    $countryName = "default";

    if(function_exists('geoip_detect2_get_info_from_current_ip')) {
      $geo = geoip_detect2_get_info_from_current_ip();
      $countryName =  $geo->country->names['en'];
    }

    if(empty($countryName) || !in_array($countryName, $countries)) {
      $countryName = "default";
    }

    return $countryName;
  }
?>
