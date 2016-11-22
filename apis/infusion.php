<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function create_contact() {
  $app = new iSDK();
  $contactData = array('FirstName' => 'John', 'LastName'  => 'Doe', 'Email' => 'JDoe@email.com');

  try{
    $res = $app->addCon('d871db40497cbbd7c9e25898749d128d', $contactData);
    return $res;
  } catch(Exception $e) {
    return $e;
  }
 
}
