<?php

function bs_donate_sc($atts, $content = null) {
  $at = shortcode_atts( array(
    "vertical" => false,
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
    "validation_country" => "Incorrect country",
    "is_blue" => false,
    "subtext" => "",
    "amount_text_ten" => "",
    "amount_text_thirty" => "",
    "amount_text_fifty" => "",
    "amount_text_hundred" => "",
    "amount_text_other" => "",
    "show_amount_texts" => false,
    "tags" => ""
  ), $atts );

  ob_start();
?>

<donate-landing
    tags="<?php echo $at['tags'] ?>"
    donation_type="monthly"
    url="<?php echo get_template_directory_uri() ?>"
    currency="usd"
    country="<?php echo getCountry() ?>"
    back-text=<?php echo $at['back_text'] ?>
    monthly=<?php echo $at['monthly'] ?>
    once="<?php echo $at['once'] ?>"
    is-blue='<?php echo $at['is_blue'] ?>'
    :redirect="{
      once: '<?php echo get_option('donate_once_redirect') ?>',
      monthly: '<?php echo get_option('donate_monthly_redirect') ?>',
    }"
    :card-src="{
      Visa: '<?php echo str_replace("http:", "", get_template_directory_uri()) . '/public/img/cards/Visa.png' ?>',
      MasterCard: '<?php echo str_replace("http:", "", get_template_directory_uri()) . '/public/img/cards/MasterCard.png' ?>',
      DinersClub: '<?php echo str_replace("http:", "", get_template_directory_uri()) . '/public/img/cards/DinersClub.png' ?>',
      AmericanExpress:'<?php echo str_replace("http:", "", get_template_directory_uri()) . '/public/img/cards/AmericanExpress.png' ?>',
      Discover: '<?php echo str_replace("http:", "", get_template_directory_uri()) . '/public/img/cards/Discover.png' ?>'
    }"
    :link="{
      anchor: '<?php echo $at['link_anchor'] ?>',
      text: '<?php echo $at['link_text'] ?>'
    }"
    :validation-messages="{
      card: '<?php echo $at['validation_card'] ?>',
      month: '<?php echo $at['validation_month'] ?>',
      year: '<?php echo $at['validation_year'] ?>',
      cvc: '<?php echo $at['validation_cvc'] ?>',
      name: '<?php echo $at['validation_name'] ?>',
      email: '<?php echo $at['validation_email'] ?>',
      country: '<?php echo $at['validation_country'] ?>',
      declined: '<?php echo $at['validation_declined'] ?>'
    }"
    subtext='<?php echo $at['subtext'] ?>'
    :texts="{
        sectionOne: {
          title: '<?php echo $at['section_title_1'] ?>',
          content: '<?php echo $at['section_content_1']  ?>',
          btn: '<?php echo $at['section_btn_1'] ?>'
        },
        sectionTwo: {
          title: '<?php echo $at['section_title_2'] ?>',
          content: '<?php echo $at['section_content_2'] ?>',
          btn: '<?php echo $at['section_btn_2'] ?>'
        },
        sectionThree: {
          title: '<?php echo $at['section_title_3'] ?>',
          content: '<?php echo $at['section_content_3'] ?>',
          btn: '<?php echo $at['section_btn_3'] ?>'
        }
      }"
    :placeholders="{
      loading: '<?php echo $at['placeholder_loading'] ?>',
      amount: '<?php echo $at['placeholder_amount'] ?>',
      creditCard: '<?php echo $at['placeholder_credit_card'] ?>',
      month: '<?php echo $at['placeholder_month'] ?>',
      year: '<?php echo $at['placeholder_year'] ?>',
      cvc: '<?php echo $at['placeholder_cvc'] ?>',
      name: '<?php echo $at['placeholder_name'] ?>',
      email: '<?php echo $at['placeholder_email'] ?>',
      country: '<?php echo $at['placeholder_country'] ?>'
    }"
    :show-amount-texts="<?php echo $at['show_amount_texts']  ?>"
    :amount-texts="{
      ten: '<?php echo $at['amount_text_ten'] ?>',
      thirty: '<?php echo $at['amount_text_thirty'] ?>',
      fifty: '<?php echo $at['amount_text_fifty'] ?>',
      hundred: '<?php echo $at['amount_text_hundred'] ?>',
      other: '<?php echo $at['amount_text_other'] ?>'
    }"
  >
  </donate-landing>
<?php
  return ob_get_clean();
} //close bs_donate_sc

function bs_donate_vc() {
  $bs_donate_sections = [];


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
    [
      "type" => "checkbox",
      "heading" => "Blue",
      "param_name" => "is_blue",
      "value" => false
    ],

    [
      "type" => "textarea",
      "heading" => "subtext",
      "param_name" => "subtext",
      "value" => ''
    ],

    [
      "type" => "textfield",
      "heading" => "Link text",
      "param_name" => "link_text",
      "value" => ''
    ],

    [
      "type" => "textfield",
      "heading" => "Link anchor",
      "param_name" => "link_anchor",
      "value" => ''
    ],

    [
      "type" => "textfield",
      "heading" => "monthly",
      "param_name" => "monthly",
      "value" => 'Monthly'
    ],

    [
      "type" => "textfield",
      "heading" => "once",
      "param_name" => "once",
      "value" => 'Once'
    ],

    [
      "type" => "textfield",
      "heading" => "amount",
      "param_name" => "amount",
      "value" => 'Amount'
    ],

    [
      "type" => "textfield",
      "heading" => "back",
      "param_name" => "back_text",
      "value" => ""
    ]

  );

  $fields = [
    'card',
    'month',
    'year',
    'cvc',
    'name',
    'email',
    'country'
  ];

  foreach($fields as $field) {
    $validation = array(
      "type" => "textfield",
      "heading" => "validation message for " . $field,
      "param_name" => "validation_" . $field,
      "value" => 'incorrect ' . $field
    );

    array_push($bs_donate_sections, $validation);
  }

    array_push($bs_donate_sections, [
        "type" => "textfield",
        "heading" => "validation message for declined",
        "param_name" => "validation_declined",
        "value" => 'Your transaction was not accepted, try again'
    ]);

    $placeholders = [
      'loading',
      'amount',
      'credit_card',
      'month',
      'year',
      'cvc',
      'name',
      'email',
      'country'
    ];

    foreach($placeholders as $field) {
      $placeholder = array(
        "type" => "textfield",
        "heading" => "placeholder for " . $field,
        "param_name" => "placeholder_" . $field,
        "value" => ''
      );

      array_push($bs_donate_sections, $placeholder);
    }

    array_push($bs_donate_sections, array(
       "type" => "checkbox",
        "heading" => "vertical",
        "param_name" => "vertical",
        "value" => false
    ));

    array_push($bs_donate_sections, array(
       "type" => "checkbox",
        "heading" => "Show Amount texts",
        "param_name" => "show_amount_texts",
        "value" => false
    ));

    $amount_texts = [
      'ten',
      'thirty',
      'fifty',
      'hundred',
      'other'
    ];

    foreach($amount_texts as $amount_text) {
      $amountText = array(
        "type" => "textarea",
        "heading" => "amount for " . $amount_text,
        "param_name" => "amount_text_" . $amount_text,
        "value" => ''
      );

      array_push($bs_donate_sections, $amountText);
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

add_shortcode('bs_donate', 'bs_donate_sc');
add_action( 'vc_before_init', 'bs_donate_vc' );
