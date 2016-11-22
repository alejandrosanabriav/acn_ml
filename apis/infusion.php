<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function infusion_create_contact() {
  try{
    $apikey = 'd871db40497cbbd7c9e25898749d128d';
    $contactData = array('FirstName' => 'John', 'LastName'  => 'Doe', 'Email' => 'JDoe@email.com');
    $infusionsoft = new \Infusionsoft\Infusionsoft(array(
        'clientId' => 'mw527jzrgehcperyrpkgsdbe',
        'clientSecret' => 'pvD2hvpjCm',
        'redirectUri' => '/',
    ));
    $infusionsoft->refreshAccessToken();
    return  $infusionsoft->contacts()->add($data);
  } catch(Exception $e) {
    return $e;
  }
}
