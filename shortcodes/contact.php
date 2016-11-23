<?php
add_shortcode( 'bs_slider', 'bs_slider_sc' );

function bs_contact_sc($atts, $content = null) {
  $at = shortcode_atts( array(
    'text_pray' => '',
    'text_checkbox' => '',
    'placeholder_name' => '',
    'placeholder_email' => '',
    'message_name' => '',
    'message_email' => '',
    'message_accept' => ''
  ), $atts );

  ob_start();
?>

<contact
  :texts="{pray: '<?php echo $at['text_pray'] ?>', checkbox: '<?php echo $at['text_checkbox'] ?>'}" 
  :placeholders="{name: '<?php echo $at['placeholder_name'] ?>', email: '<?php echo $at['placeholder_email'] ?>'}"
  :messages"{
    name: {
			required: {message: 'Nombre requerido'}
		},
    email: {
      email: {message: 'Email incorrecto'}
    },
    accept: {
      truthy: {message: 'debes aceptar'}
    }
  }"
  country="<?php echo getCountry() ?>"
  base-uri=<?php echo get_template_directory_uri() ?>
  redirect=<?php echo get_option('subscribe_redirect') ?>
>
</contact>

<?php

  return ob_get_clean();
} //close bs_contact
function bs_contact_vc() {
  $params = [
    [
      "type" => "textfield",
      "heading" => "placeholder name",
      "param_name" => "placeholder_name",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "placeholder email",
      "param_name" => "placeholder_email",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "Button Text",
      "param_name" => "text_pray",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "Checkbox Text",
      "param_name" => "text_checkbox",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "Message error name",
      "param_name" => "message_name",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "Message error email",
      "param_name" => "message_email",
      "value" => ""
    ],
    [
      "type" => "textfield",
      "heading" => "Message error accept",
      "param_name" => "message_accept",
      "value" => ""
    ],
  ];

  vc_map(
    array(
      "name" =>  "BS Contact",
      "base" => "bs_contact",
      "category" =>  "BS",
      "params" => $params
    ) 
  );
}

add_shortcode('bs_contact', 'bs_contact_sc');
add_action( 'vc_before_init', 'bs_contact_vc' );
