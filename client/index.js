'use strict';
import Vue from 'vue';
import input from './input';
import form from './form';
import donate from './donate';
import {steps, step} from './components/steps';

(function() {
  steps();
  step();
  new Vue({el: '#app'});
  Vue.component('bs-donate', donate);
  input();
  form();
  donate();
})();
