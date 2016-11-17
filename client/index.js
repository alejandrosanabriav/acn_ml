'use strict';
import input from './input';
import form from './form';
import donate from './components/donate';
import donateLand from './components/donate_land';
import changeAmount from './components/change_amount';
import sliderBg from './components/slider_bg';

(function() {
	console.log(sliderBg);
	Vue.component('change-amount', changeAmount());
	Vue.component('donate-landing', donate());
	Vue.component('donate-land', donateLand());
	Vue.component('bs-slider-bg', sliderBg());

	new Vue({el: '#app-ml'});

	input();
	form();
	donate();
  
})();
