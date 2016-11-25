<?php
include str_replace('shortcodes', '',  __DIR__) . 'lib/shortcode_factory.php';

$base = __DIR__;
$prefix = 'bs_';

//register shortcodes
if(function_exists('sc_factory')) {

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

  sc_factory($prefix . 'donate', array(
    "section_title_1" => "",
    "section_content_1" => "",
    "section_btn_1" => "DONATE",
    "section_title_2" => "",
    "section_content_2" => "",
    "section_btn_2" => "NEXT",
    "section_title_3" => "",
    "section_content_3" => "",
    "section_btn_3" => "DONATE",
    "link_text" => "SEE MORE",
    "link_anchor" => "#content",
    "monthly" => "Monthly",
    "once" => "Once",
    "amount" => "Amount",
    "back_text" => "Back",
    "placeholder_loading" => "Loading",
    "placeholder_amount" => "Amount",
    "placeholder_credit_card" => "Credit Card Number",
    "placeholder_month" => "MM",
    "placeholder_year" => "YY",
    "placeholder_cvc" => "CVC",
    "placeholder_name" => "Name",
    "placeholder_email" => "Email",
    "placeholder_country" => "Country",
    "validation_declined" => "Your transaction was not accepted, try again",
    "validation_card" => "Incorrect card",
    "validation_month" => "Incorrect month",
    "validation_year" => "Incorrect year",
    "validation_cvc" => "Incorrect cvc",
    "validation_name" => "Incorrect name",
    "validation_email" => "Incorrect email",
    "validation_country" => "Incorrect country"
    ), $base . '/donate.php' );

  function bs_donate_vc() {
    $bs_donate_sections = array();

    //sections content
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

    $sec_btn = array(
      "type" => "textfield",
      "heading" => "section button " . $section,
      "param_name" => "section_btn_" . $section,
      "value" => ''
    );

    array_push($bs_donate_sections, $sec_title, $sec_content, $sec_btn);
  }


  array_push($bs_donate_sections,
    array(
      "type" => "textfield",
      "heading" => "Link text",
      "param_name" => "link_text",
      "value" => ''
    ),
    
    array(
      "type" => "textfield",
      "heading" => "Link anchor",
      "param_name" => "link_anchor",
      "value" => ''
    ),

    array(
      "type" => "textfield",
      "heading" => "monthly",
      "param_name" => "monthly",
      "value" => 'Monthly'
    ),

    array(
      "type" => "textfield",
      "heading" => "once",
      "param_name" => "once",
      "value" => 'Once'
    ),

    array(
      "type" => "textfield",
      "heading" => "amount",
      "param_name" => "amount",
      "value" => 'Amount'
    ),

    array(
      "type" => "textfield",
      "heading" => "back",
      "param_name" => "back_text",
      "value" => ""
    )

  );

    foreach(['card', 'month', 'year', 'cvc', 'name', 'email', 'country'] as $field) {
      $validation = array(
        "type" => "textfield",
        "heading" => "validation message for " . $field,
        "param_name" => "validation_" . $field,
        "value" => 'incorrect ' . $field
      );

      array_push($bs_donate_sections, $validation);
    }
    
    array_push($bs_donate_sections, array(
        "type" => "textfield",
        "heading" => "validation message for declined",
        "param_name" => "validation_declined",
        "value" => 'Your transaction was not accepted, try again'
      ));

    foreach(['loading', 'amount', 'credit_card', 'month', 'year', 'cvc', 'name', 'email', 'country'] as $field) {
      $placeholder = array(
        "type" => "textfield",
        "heading" => "placeholder for " . $field,
        "param_name" => "placeholder_" . $field,
        "value" => ''
      );

      array_push($bs_donate_sections, $placeholder);
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
