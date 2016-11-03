<?php
require 'vendor/autoload.php';
$urlBase = 'http://us13.api.mailchimp.com/3.0/';
$apiKey = '709cb76ed68f751a3ae287f2c067a046-us13';

function getList($key) {

  $lists = array(
    "default" => "12e64d3542",
    "es" => "cb877da544",
    "fr" => "1ccb4f2fe4",
    "ko" => "54eee25250",
    "it" => "9f0b136cc4",
    "nl" => "25b2cd176d",
    "pt" => "876d0a71b3",
    "syria" => "c17c966aad"
  );

  if(empty($key)) $key = "default";

  if(!array_key_exists($key, $lists)) $key = "default";

  return $lists[$key];
}

$name = $_POST['name'] ? $_POST['name'] : '';
$email = $_POST['email'];
$country = $_POST['country'];
$listKey = $_POST['lang'];
$listId = getList($listKey);

$data = '{
      "email_address": "'.$email.'",
      "status": "subscribed",
      "merge_fields": {"COUNTRY": "'.$country.'", "FNAME": "'. $name .'"},
      "update_existing": true
}';

$options = array(
	'auth' => array('user', $apiKey)
);

$headers = array('Accept' => 'application/json', 'content-type' => 'application/json');

$req = Requests::post($urlBase . 'lists/' . $listId . '/members', $headers, $data, $options);


var_dump($req->body);
?>
