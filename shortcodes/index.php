<?php
include str_replace('shortcodes', '',  __DIR__) . 'lib/shortcode_factory.php';

$base = __DIR__;
$prefix = 'bs_';

//register shortcodes
if(function_exists('sc_factory')) {  

  sc_factory($prefix . 'test', array(), $base . '/test.php');

  sc_factory($prefix . 'contact', array(
      'btn_title' => 'PRAY', 
      'btn_style' => ''
    ), 
    $base . '/contact.php'
  );

  sc_factory($prefix . 'input', array(
      'label' => '', 
      'placeholder' => '', 
      'id' => '', 
      'validate' => '', 
      'messages' => ''
    ), 
    $base . '/input.php'
  );

  sc_factory($prefix . 'select_country', array(
      'label' => '', 
      'placeholder' => '', 
      'id' => '', 
      'validate' => '', 
      'messages' => ''
    ), 
    $base . '/select_country.php'
  );

  sc_factory($prefix . 'form_donate', array(
      'label' => '', 
      'placeholder' => '', 
      'id' => '', 
      'validate' => '', 
      'messages' => ''
    ),
    $base . '/form_donate.php'
  );

  sc_factory($prefix . 'steps', array(

    ),
    $base . '/steps.php'
  );

  sc_factory($prefix . 'donate', array(

    ),
    $base . '/donate.php'
  );

}
