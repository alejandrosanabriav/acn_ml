<?php

function bs_contact_sc($atts, $content = null) {
  $at = shortcode_atts( array(
    'text_pray' => 'PRAY',
    'text_checkbox' => 'I accept to receive updates and information from ACN',
    'placeholder_name' => 'Name',
    'placeholder_email' => 'Email',
    'message_name' => 'Name required',
    'message_email' => 'Email incorrect',
    'message_accept' => 'You must accept'
  ), $atts );

  ob_start();
?>

<contact
  :texts="{pray: '<?php echo $at['text_pray'] ?>', checkbox: '<?php echo $at['text_checkbox'] ?>'}" 
  :placeholders="{name: '<?php echo $at['placeholder_name'] ?>', email: '<?php echo $at['placeholder_email'] ?>'}"
  :rules="{
    name: {
			required: {message: '<?php echo $at['message_name'] ?>'}
		},
    email: {
      email: {message: '<?php echo $at['message_email'] ?>'}
    },
    accept: {
      truthy: {message: '<?php echo $at['message_accept'] ?>'}
    }
  }"
  country="<?php echo getCountry() ?>"
  base-uri=<?php echo get_template_directory_uri() ?>
  redirect=<?php echo get_option('subscribe_redirect') ?>
  type="<?php if(get_option('infusionsoft_key')): echo 'infusion'; elseif(get_option('mailchimp_api')): echo 'mailchimp'; endif; ?>"
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
