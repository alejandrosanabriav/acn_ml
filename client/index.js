'use strict';
import input from './input';
import form from './form';
import donate from './components/donate';
import changeAmount from './components/change_amount';
import {steps, step} from './components/steps';

(function() {
  steps();
  step();

  Vue.component('change-amount', changeAmount());
  Vue.component('donate-landing', donate());

  new Vue({el: '#app-ml'});
  input();
  form();
  donate();
})();
