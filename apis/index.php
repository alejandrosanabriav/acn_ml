<?php
include_once 'mailchimp.php';
include_once 'stripe.php';
include_once 'infusion.php';
include_once str_replace('apis', '', __DIR__) . 'lib/countries.php';

add_action( 'wp_ajax_nopriv_mailchimp_subscribe', 'mailchimp_subscribe' );
add_action( 'wp_ajax_mailchimp_subscribe', 'mailchimp_subscribe' );

function mailchimp_subscribe() {
  $data = json_encode($_POST['data']);
  $listId = get_option('mailchimp_list_id');
  $apiKey =  get_option('mailchimp_api');
  $res = mc_subscribe($data, $listId, $apiKey);
  echo $res;
  die();
}

add_action( 'wp_ajax_nopriv_stripe_token', 'stripe_token' );
add_action( 'wp_ajax_stripe_token', 'stripe_token' );

function stripe_token() {
  $card = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');
  $res = stripe_create_token( $apiKey, $card);
  header('Content-type: application/json');
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_stripe_charge', 'stripe_charge' );
add_action( 'wp_ajax_stripe_charge', 'stripe_charge' );

function stripe_charge() {
  $data = $_POST['data'];
  $apiKey =  get_option('stripe_key_private');

  if($data['donation_type'] == 'monthly') {
    $res = stripe_create_charge($apiKey, $data);
  } else if($data['donation_type'] == 'once') {
    $res = stripe_monthly($apiKey, $data);
  } else {
    $res = array('type fail');
  }
  
  header('Content-type: application/json');
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_countries', 'get_countries' );
add_action( 'wp_ajax_countries', 'get_countries' );

function get_countries() {
  $res = getCountries();
  header('Content-type: application/json');
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_infusion_contact', 'infusion_contact' );
add_action( 'wp_ajax_infusion_contact', 'infusion_contact' );

function infusion_contact() {
  try {
    $res = infusion_create_contact();
  } catch(Exception $e) {
    echo $e;
    die();
  }
  
  header('Content-type: application/json');
  echo json_encode($res);
  die();
}


