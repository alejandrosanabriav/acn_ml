'use strict';
import Vue from 'vue';

export const steps = () => Vue.component('bs-steps', {
  template: '#steps-template',
  data() {
    return {
      currentStep: 1
    }
  },

});

export const step = () => Vue.component('bs-step', {
  template: '#step-template',
  props: ['step'],

});
