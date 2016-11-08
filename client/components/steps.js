'use strict';
import Vue from 'vue';

export const steps = () => Vue.component('steps', {
  template: '#steps-template',
  data() {
    return {
      currentStep: 1
    }
  },

});

export const step = () => Vue.component('step', {
  template: '#step-template',
  props: ['step'],

});
