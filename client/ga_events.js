'use strict';
const Promise = require('promise');

module.exports = () => {

  let sendEvent = (eventCategory, eventAction, eventLabel) => {
    return new Promise((resolve, reject) => {

      ga('send', 'event', eventCategory, eventAction, eventLabel, {
        hitCallback() {
          return resolve();
        }
      });

    });
  };

  let fns = {
    donateUnique() {
      sendEvent('donate', 'unique', 'donate action')
      .then(() => console.log('donateUnique'));
    },

    donateMonthly() {
      sendEvent('donate', 'monthly', 'donate action')
      .then(() => console.log('donateMonthly'));
    },

    donateInClick() {
      sendEvent('donate', 'insiteclick', 'donate intention')
      .then(() => console.log('donateInClick'));
    },

    donateOutClick() {
      sendEvent('donate', 'outclick', 'donate intention')
      .then(() => console.log('donateOutClick'));
    }
  };

  return fns;
}
