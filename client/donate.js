'use strict';
import $ from 'jquery';

export default function() {
  let form = $('.bs_donate_form');
  let steps = form.find('.bs_donate_form__step');
  let maxStep = steps.length;
  let step = 0;

  form.on('submit', function(evt) {
    evt.preventDefault();
    steps.removeClass('bs_donate_form__step--active');
    steps[step++].addClass('bs_donate_form__step--active');
  });
}
