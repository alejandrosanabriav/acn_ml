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

  function bs_donate_vc() {
    $bs_donate_sections = array();

  foreach([1,2,3] as $section) {

    $sec_title = array(
      "type" => "textfield",
      "heading" => "section title " . $section,
      "param_name" => "section_title_" . $section,
      "value" => ''
    );

    $sec_content = array(
      "type" => "textarea",
      "heading" => "section content " . $section,
      "param_name" => "section_content_" . $section,
      "value" => ''
    );

    array_push($bs_donate_sections, $sec_content, $sec_title);
  }

    vc_map(
      array(
        "name" =>  "BS donate",
        "base" => "bs_donate",
        "category" =>  "BS",
        "params" => $bs_donate_sections
      ) 
    );
  }

  add_action( 'vc_before_init', 'bs_donate_vc' );

  sc_factory($prefix . 'donate_land', array(), $base . '/donate_land.php' );
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
