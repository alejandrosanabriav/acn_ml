'use strict';

export default () => ({
	props: ['other', 'amount-text'],

	
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

		},

    getText() {
      console.log(this.$parent.amount);
    }
	},

	template:`
    <div style="padding: 0 15px">
      <div class="change-amount__copywrite">
        {amountText}
      </div>
    </div>

		<ul class="change-amount" style="padding: 0 15px">
      <li class="col-md-2">
        <a
          href="#" 
          v-bind:class="[ $parent.amount == 10 ? 'active' : ''  ]"
          v-on:click="changeAmount(10, $event)">$ 10</a>
      </li>
      
      <li class="col-md-2">
        <a
          href="#"
          v-bind:class="[ $parent.amount == 30 ? 'active' : ''  ]"  
          v-on:click="changeAmount(30, $event)"
        >$ 30</a>
      </li>
      <li class="col-md-2">
        <a 
          href="#" 
          v-bind:class="[ $parent.amount == 50 ? 'active' : ''  ]" 
          v-on:click="changeAmount(50, $event)"
        >$ 50</a>
      </li>
      <li class="col-md-2">
        <a 
          href="#" 
          v-bind:class="[ $parent.amount == 100 ? 'active' : ''  ]" 
          v-on:click="changeAmount(100, $event)"
        >$ 100</a>
      </li>
      <li class="col-md-2">
        <a
          href="#" 
          v-bind:class="[ $parent.amount == 1 ? 'active' : ''  ]" 
          v-on:click="changeAmount('', $event)">
					{{other}}
          </a>
      </li>
    </ul>
	`,
});
