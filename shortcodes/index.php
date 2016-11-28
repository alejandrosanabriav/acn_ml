<?php
include str_replace('shortcodes', '',  __DIR__) . 'lib/shortcode_factory.php';

$base = __DIR__;
$prefix = 'bs_';

//register shortcodes
if(function_exists('sc_factory')) {
  
  sc_factory($prefix . 'slider_bg', array("images" => "", "height" => "100px", "slider_style" => "", "interval" => "3000"),$base . '/slider_bg.php');

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
          ),

          array(
            "type" => "textfield",
            "heading" => "Slider height",
            "param_name" => "height",
            "value" => '100px'
          ),

           array(
            "type" => "textfield",
            "heading" => "Slider interval",
            "param_name" => "interval",
            "value" => "3000"
          )

        )
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_slider_bg_vc' );

}
