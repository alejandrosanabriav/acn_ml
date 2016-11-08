<?php
$dir_base =  str_replace('apis', '', __DIR__);
require $dir_base . 'vendor/autoload.php';

function stripe_create_token($api_key, $card) {
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
}

function stripe_create_customer($api_key, $customer) {
  \Stripe\Stripe::setApiKey($api_key);

    try {
      $customer = \Stripe\Customer::create(array(
      "description" => 'charge for '. $customer['email'],
      "email" => $customer['email'],
      "source" => $customer['stripe_token']
    ));
      
    return $customer;
  } catch(Exception $e) {
    return $e->getMessage();
  }
  
}

function stripe_create_charge($api_key, $charge) {
  \Stripe\Stripe::setApiKey($api_key);

  $charge = \Stripe\Charge::create(array(
    "amount" => $charge['amount'],
    "currency" => $charge['currency'],
    "source" => $charge['stripe_token']
  ));

  return $charge;
}

function stripe_get_plan($api_key, $name) {
  \Stripe\Stripe::setApiKey($api_key);
  try{
    $plan = \Stripe\Plan::retrieve($name);
    return $plan;
  } catch(Exception $ex) {
    return '';
  }
  
}

function stripe_create_plan($api_key, $plan) {
  \Stripe\Stripe::setApiKey("sk_test_vq5s51SGycQ6dvCqC3H7JcCl");

  $plan = \Stripe\Plan::create(array(
    "amount" => $plan['amount'] . '00',
    "interval" => "month",
    "name" => $plan['plan_name'],
    "currency" => $plan['currency'],
    "id" => $plan['plan_name'])
  );

  return $plan;
}

function stripe_create_subscription($api_key, $charge) {
  \Stripe\Stripe::setApiKey($api_key);
  try {
    $subscription = \Stripe\Subscription::create(array(
    "customer" => $charge['customer'], //"cus_9MzzzON1VtZiKY",
    "plan" => $charge['plan'] //"donation-55"
    ));

    return $subscription;

  } catch(Exception $e) {
    return $e;
  }
  
}

function get_plan_name($amount) {
  return 'donation-' . $amount;
}

function stripe_monthly($api_key, $data) {
  $plan_name = get_plan_name($data['amount']);
  $data['plan_name'] = $plan_name;
  $plan = '';

  if(!empty(stripe_get_plan($api_key, $plan_name))) {
    $plan = stripe_get_plan($api_key, $plan_name);
  } else {
    $plan = stripe_create_plan($api_key, $data);
  }

  $customer = stripe_create_customer($api_key, $data);
  $charge = array();
  $charge['customer'] = $customer->id;
  $charge['plan'] = $plan->id;

  return stripe_create_subscription($api_key, $charge);
}
