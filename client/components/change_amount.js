'use strict';

export default () => ({
	template: '#change-amount-template',
  
	methods: {
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
