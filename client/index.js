'use strict';
require('array.from');
import donate from './components/donate';
import contact from './components/contact';
import changeAmount from './components/change_amount';
import sliderBg from './components/slider_bg';
import share from './components/share';
import btnDonate from './lib/btn_donate';

(function() {
	console.log('cache is:', new Date());
	
	Vue.component('change-amount', changeAmount());
	Vue.component('donate-landing', donate());
	Vue.component('bsslider-bg', sliderBg());
	Vue.component('contact', contact());
	Vue.component('bs-share', share());

	const vm = new Vue({ el: '#app-ml' });
	
	btnDonate();

	$('.bs-share').on('click', e => ga('send', 'event', 'DONATION', 'SHARE_CLICK', 'SHARE_CLICK', 0));

	$('.bs-back').on('click', e => {
		 e.preventDefault(); 
		 window.history.back();
	});

})();
