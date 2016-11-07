'use strict';
import $ from 'jquery';

export default function() {
  let form = document.querySelector('.bs_donate_form');
  let steps = form.querySelectorAll('.bs_donate_form__step');
  let maxStep = steps.length;
  console.log(steps[2]);
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    console.log('submit');
  });
}
