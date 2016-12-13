<?php
$dir_base =  str_replace('apis', '', __DIR__);

if( file_exists($dir_base . '/vendor/autoload.php') ) {

  require $dir_base . 'vendor/autoload.php';
  
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
  
  function getMergeFields($post) {

    return '';
  }

  // $name = $_POST['name'] ? $_POST['name'] : '';
  // $email = $_POST['email'];
  // $country = $_POST['country'];
  // $listKey = $_POST['lang'];
  // $listId = 'e4bd5ff7e0';

  // $data = '{
  //       "email_address": "'.$email.'",
  //       "status": "subscribed",
  //       "merge_fields": {"COUNTRY": "'.$country.'", "FNAME": "'. $name .'"},
  //       "update_existing": true
  // }';

function mc_subscribe($data, $listId, $apiKey) {
  $options = array(
    'auth' => array('user', $apiKey)
  );
  
  $datacenter =  explode("-", $apiKey);
  $headers = array('Accept' => 'application/json', 'content-type' => 'application/json');
  $urlBase = 'http://'. $datacenter[1] .'.api.mailchimp.com/3.0/';
  $req = Requests::post($urlBase . 'lists/' . $listId . '/members', $headers, $data, $options);
  return $req->body;
}
 

}

?>