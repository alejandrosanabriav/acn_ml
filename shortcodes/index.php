<?php
include str_replace('shortcodes', '',  __DIR__) . 'lib/shortcode_factory.php';

$base = __DIR__;

if(function_exists('sc_factory')) {
  //register shortcodes
sc_factory('test_sc', array(), $base . 'test.php');

}
