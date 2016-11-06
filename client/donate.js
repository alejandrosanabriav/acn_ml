'use strict';
import { map, each, on, onAll, reduce, flatten } from './fun';

function changeStep(el = document, step = 1) {
  let nextStep =  (parseInt(step) + 1);
  el.querySelector('input[name="step"]').setAttribute('value', nextStep);
}

function addClass(el, newClass) {
  let prevClasses = el.getAttribute('class');
  el.setAttribute('class', prevClasses + ' ' + newClass);
  console.log(prevClasses);
}

export default function donate() {
  let $forms = document.querySelectorAll('.bs_donate_form');  

  let onSubmit = function(e) {
    e.preventDefault();
    let $form = this;
    let step = $form.querySelector('input[name="step"]').value;
    let maxStep = 3;

    if(step != maxStep) {
      changeStep($form, step);
    }

    addClass($form.querySelector(`.bs_donate_form__step-${step}`), 'new-nea');

    $form.querySelector(`.bs_donate_form__step-${step}`).style.display = 'block';
  };

  onAll('submit', onSubmit)($forms);

  //handle btns amount
  each(function(el) {
    let $form = el;
    let $amountBtns = $form.querySelectorAll('button[data-amount]');
    let $amountInput = $form.querySelector('input[name="amount"]');

    onAll('click', function(e) {
      e.preventDefault();
      let amount = this.getAttribute('data-amount');
      $amountInput.setAttribute('value', amount);
    })($amountBtns);

  })($forms);
  
}
