'use strict';
import Vue from 'vue';
import input from './input';
import form from './form';
import donate from './donate';
import {steps, step} from './components/steps';

(function() {
  new Vue({el: '#app'});
    
  steps();
  step();
  input();
  form();
  donate();
})();
