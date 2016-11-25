'use strict';

export default (id, revenue = 0, affiliation = 'ACN ME') => {
	ga('ecommerce:addTransaction', {
		'id': id,                     // Transaction ID. Required.
		'affiliation': affiliation,   // Affiliation or store name.
    'revenue': revenue,
    'currency': 'USD'
  });

  return ga('ecommerce:send');
};
