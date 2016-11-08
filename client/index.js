'use strict';
import Vue from 'vue';
import input from './input';
import form from './form';
import donate from './components/donate';
import {steps, step} from './components/steps';

(function() {
  steps();
  step();
   Vue.component('donate-landing', donate);
  new Vue({el: '#app'});
  input();
  form();
  donate();
})();
