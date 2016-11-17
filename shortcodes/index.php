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

  sc_factory($prefix . 'steps', array(), $base . '/steps.php' );
  sc_factory($prefix . 'donate', array(), $base . '/donate.php' );
  sc_factory($prefix . 'donate_land', array(), $base . '/donate_land.php' );
  sc_factory($prefix . 'bs_slider_bg', array("images" => "", "slider_style" => ""),$base . '/donate_land.php');

  function bs_slider_bg_vc() {
    vc_map(
      array(
        "name" =>  "BS slider bg",
        "base" => "bs_slider_bg",
        "category" =>  "BS",
        "params" => array(
          array(
            "type" => "attach_images",
            "param_name" => "images"
          ),

           array(
            "type" => "textfield",
            "heading" => "Slider style",
            "param_name" => "slider_style",
            "value" => ''
          )
        )
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_slider_bg_vc' );

}
