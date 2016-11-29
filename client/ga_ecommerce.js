'use strict';

module.exports = function(id, affiliation = 'ACN International', revenue = 0) {

  ga('ecommerce:addTransaction', {
    'id': id,                     // Transaction ID. Required.
    'affiliation': affiliation,   // Affiliation or store name.
    'revenue': revenue,
    'currency': 'EUR'
  });

  return ga('ecommerce:send');
};
