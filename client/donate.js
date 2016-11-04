'use strict';
import { map, each, on, onAll, reduce, flatten } from './fun';

export default function donate() {
  let onSubmit = function(e) {
    e.preventDefault();
    console.log('donate');
  };

  let $forms = document.querySelectorAll('.bs_donate_form');

  onAll('submit', onSubmit)($forms);
  
}
