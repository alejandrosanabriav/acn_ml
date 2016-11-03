<?php
include 'lib/shortcode_factory.php';
$base = __DIR__;

//register shortcodes
sc_factory('test_sc', array(), $base . 'test.php');
