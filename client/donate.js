'use strict';
import { map, each, on, onAll, reduce, flatten } from './fun';

export default function donate() {
  let onSubmit = function(e) {
    e.preventDefault();
    let $form = this;
  };

  let $forms = document.querySelectorAll('.bs_donate_form');  

  onAll('submit', onSubmit)($forms);

  each(function() {
    let $amountBtns = $form.querySelectorAll('button[data-amount]');
    
    onAll((e) => {
      e.preventDefault();
      console.log(this);
    })($amountBtns);


  })($forms);
  
}
