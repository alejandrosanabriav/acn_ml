<donate-landing
    donation_type="monthly"
    url="<?php echo get_template_directory_uri() ?>"
    currency="usd"
    country="<?php echo getCountry() ?>"
    back-text=<?php echo $at['back_text'] ?>
    monthly=<?php echo $at['monthly'] ?>
    once=<?php echo $at['once'] ?>
    :redirect="{
      once: '<?php echo get_option('donate_once_redirect') ?>',
      monthly: '<?php echo get_option('donate_monthly_redirect') ?>',
    }"
    :card-src="{
      Visa: '<?php echo get_template_directory_uri() . '/public/img/cards/Visa.png' ?>',
      MasterCard: '<?php echo get_template_directory_uri() . '/public/img/cards/MasterCard.png' ?>',
      DinersClub: '<?php echo get_template_directory_uri() . '/public/img/cards/DinersClub.png' ?>',
      AmericanExpress:'<?php echo get_template_directory_uri() . '/public/img/cards/AmericanExpress.png' ?>',
      Discover: '<?php echo get_template_directory_uri() . '/public/img/cards/Discover.png' ?>'
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
      country: '<?php echo $at['validation_country'] ?>'
    }"
    :texts="{
        sectionOne: {
          title: '<?php echo $at['section_title_1'] ?>',
          content: '<?php echo $at['section_content_1'] ?>',
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
  >
  </donate-landing>
