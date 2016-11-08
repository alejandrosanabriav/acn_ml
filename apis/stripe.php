<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function stripe_create_token($api_key, $card) {
  try {
    \Stripe\Stripe::setApiKey($api_key);
  
    $token = \Stripe\Token::create(array(
      "card" => array(
      "number" => $card['number'],
      "exp_month" => $card['exp_month'],
      "exp_year" => $card['exp_year'],
      "cvc" => $card['cvc']
    )
    ));

    return $token;
  } catch(Exception $e) {
    return $e;
  }

}

function stripe_create_customer($api_key, $customer) {
  \Stripe\Stripe::setApiKey($api_key);
  try {
    $customer = \Stripe\Customer::create(array(
      "email" => $customer['email'],
      "source" => $customer['token']
    ));
  } catch(Exception $e) {
    return $e;
  }
 

  return $customer;
}

function stripe_create_charge($api_key, $charge) {
  \Stripe\Stripe::setApiKey($api_key);

  \Stripe\Charge::create(array(
    "amount" => $charge['amount'],
    "currency" => $charge['currency'],
    "source" => $charge['token']
  ));

}