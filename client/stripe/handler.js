'use strict';

let stripeResponseHandler = function(response, $form) {

  let token = response.id;
  let $paymentErrors = $form.find('.payment-errors');

  if(response.error) {
    $form
    .find('.payment-errors')
    .removeClass('hidden')
    .text(response.error.message);
  }

  $paymentErrors.addClass('hidden');

  $form
  .find('input[name="stripe_token"]')
  .remove();

  $form
  .append(
    $('<input type="hidden" name="stripe_token" />').val(token)
  );

  $form
  .find('.contact-data')
  .removeClass('hidden');

  $form
  .find('.bs-charge-stripe')
  .removeClass('hidden');


  $form
  .find('.bs-get-stripe-token')
  .off('click')
  .remove();


};


module.exports = stripeResponseHandler;
