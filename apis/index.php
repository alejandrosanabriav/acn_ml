<?php
include_once 'mailchimp.php';
add_action( 'wp_ajax_nopriv_mailchimp_subscribe', 'mailchimp_subscribe' );
add_action( 'wp_ajax_mailchimp_subscribe', 'mailchimp_subscribe' );

function mailchimp_subscribe() {
  $data = $_POST['data'];
  $listId = get_option('mailchimp_list_id');
  $apiKey = get_option('mailchimp_api_key');
  // $res = mc_subscribe($data, $listId, $apiKey); ¸
  echo json_encode($apiKey);
  die();
}
