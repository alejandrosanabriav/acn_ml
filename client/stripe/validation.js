'use strict';
const _ = require('lodash');


let validateStripe = (data) => {

  let errors = {};
  let stripeErrors = BS.trans.stripeErrors;

  if(!Stripe.card.validateCardNumber(data.number)) {
    errors = _.extend(errors, {number: true});
  }

  if(!Stripe.card.validateExpiry(data.exp_month, data.exp_year)) {
    errors = _.extend(errors, {exp_month: true}, {exp_year: true});
  }

  if(!Stripe.card.validateCVC(data.cvc)) {
    errors = _.extend(errors, {cvc: true});;
  }

  if(_.isEmpty(errors)) {
    return {success: true};
  } else {
    return {success: false, errors: errors};
  }

};

module.exports = validateStripe;
