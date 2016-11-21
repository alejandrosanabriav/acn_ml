'use strict';
import input from './input';
import form from './form';
import donate from './components/donate';
import donateLand from './components/donate_land';
import changeAmount from './components/change_amount';
import sliderBg from './components/slider_bg';

(function() {
	Vue.component('change-amount', changeAmount());
	Vue.component('donate-landing', donate());
	Vue.component('donate-land', donateLand());
	Vue.component('bsslider-bg', sliderBg());

	const vm = new Vue({
		el: '#app-ml',
		props: ['countries'],
		ready() {
			try {
				// const {countriesArr} = JSON.parse(JSON.parse(JSON.stringify(this.countries)));
				console.log(JSON.parse(JSON.parse(JSON.stringify(this.countries))));
			} catch(exc) {
				console.error(exc);
			}
		}
	});

	input();
	form();
	donate();
  
})();
