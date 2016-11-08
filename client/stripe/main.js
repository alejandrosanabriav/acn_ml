'use strict';
const validateStripe = require('./validation');
const stripeResponseHandler = require('./handler');
const getFormData = require('./get_formdata');

let stripe = (form, btn) => {
  Stripe.setPublishableKey('pk_test_kORhSnXY5TPJMXXY5Wwiugzy');

  let $form = form;
  let data = getFormData($form);
  let validation = validateStripe(data);
  let $paymentErrors = $form.find('.payment-errors');

  if(validation.success) {
    Stripe.card.createToken({
      number: data.number,
      cvc: data.cvc,
      exp_month: data.exp_month,
      exp_year: data.exp_year,
      name: data.name,
      metadata: data.metadata
    },
    (status, response) => {
      stripeResponseHandler(response, $form)
    }
  );

  } else {
    $paymentErrors.empty();

    validation.errors.forEach((v, i) => {
      let msg = ', ' + v.msg;

      if(i == 0) {
        msg = v.msg;
      }

      $paymentErrors
      .removeClass('hidden')
      .append(msg);

    });
  }

};

module.exports = stripe;
