'use strict';
import { map, each, on, onAll, reduce, flatten } from './fun';

export default function donate() {
  let onSubmit = function(e) {
    e.preventDefault();
    let $form = this;
    console.log(this);
  };

  let $forms = document.querySelectorAll('.bs_donate_form');  

  onAll('submit', onSubmit)($forms);

  each(function(el) {
    let $form = el;
    let $amountBtns = $form.querySelectorAll('button[data-amount]');

    onAll('click', (e) => {
      e.preventDefault();
      console.log('btn', this);
    })($amountBtns);

  })($forms);
  
}
