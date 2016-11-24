'use strict';

let validateStripe = (data) => {
	let errors = {};

  if(!Stripe.card.validateCardNumber(data.number)) {
		errors = {...errors, number: true};
  }

	if(!Stripe.card.validateExpiry(data.exp_month, data.exp_year)) {
		errors = {...errors, exp_month: true, exp_year: true};
  }

  if(!Stripe.card.validateCVC(data.cvc)) {
    errors = {...errors, cvc: true};
  }

  if(Object.keys(errors).length == 0) {
    return {success: true};
  } else {
    return {success: false, errors: errors};
  }

};

module.exports = validateStripe;
