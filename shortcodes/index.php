<?php
include str_replace('shortcodes', '',  __DIR__) . 'lib/shortcode_factory.php';

$base = __DIR__;
$prexis = 'bs_';

//register shortcodes
if(function_exists('sc_factory')) {  

  sc_factory($prefix . 'test', array(), $base . '/test.php');
  sc_factory($prefix . 'contact', array(), $base . '/contact.php');

}

