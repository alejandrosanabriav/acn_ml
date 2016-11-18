'use strict';

export default () => ({
	template: '#change-amount-template',
  
	methods: {
		isAmount(amount) {
			this.$parent.amount == amount;
		},

		changeAmount(amount, e) {
			e.preventDefault();
			if(amount == '') {
				this.$dispatch('focus-amount');
			} else {
				this.$parent.amount = amount;
			}

		}
	}
});
