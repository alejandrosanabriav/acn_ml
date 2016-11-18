<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

$infusionsoft = new \Infusionsoft\Infusionsoft(array(
    'clientId'     => 'XXXXXXXXXXXXXXXXXXXXXXXX',
    'clientSecret' => 'XXXXXXXXXX',
    'redirectUri'  => 'http://example.com/',
));
