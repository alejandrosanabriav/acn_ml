'use strict';
import $ from 'jquery';
import gaEvents from '../ga_events';
import gaEcommerce from '../ga_ecommerce';
import validateStripe from '../stripe/validation.js';

const componentData = {
	donation_type: 'monthly',
	progress: '33.3%',
	captcha: null,
	amount: 30,
	section: 1,
	success: false,
	loading: false,
	countries: [],
	errors: {
		stripe: {},
		contact: {},
	},

	stripe: {
		number: '',
		exp_month: '',
		exp_year: '',
		cvc: '',
		token: ''
	},

	contact: {
		name: null,
		email: null,
		country: null
	},

	card: {
		Visa: false,
		MasterCard: false,
		DinersClub: false,
		AmericanExpress: false,
		Discover: false
	}
};

export default () => ({
	props: [ 
		'captcha_name',
		'url',
		'currency',
		'country',
		'validationMessages',
		'backText',
		'texts',
		'link',
		'cardSrc',
		'placeholders'
	],

	data() {
		return {...componentData};
	},

	init() {
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'countries'}
		}).then(res => this.countries = res);
	},

	ready() {
		const $el = this.$el; 
		this.addStylesToNodes($el);
		this.setViewportWidth($el);

		let firstNode = $el.querySelector('.donate_landing__section-1');
		$el.querySelector('.donate_landing__viewport').style.height = `${firstNode.offsetHeight}px`;
		this.contact.country = this.country;
	},

	computed: {
		cardType() {
			let type = Stripe.card.cardType(this.stripe.number).replace(" ", "");
			return type;
		}
	},

	events: {
		'focus-amount': function () {
			this.amount = 1;
			this.$els.amountInput.focus();
		}
	},

	methods: {
		addStylesToNodes(parent) {
			let nodes = parent.querySelectorAll('.donate_landing__section');
			let count = 100 / nodes.length;
			if (nodes.length) {
				[...nodes].forEach(node => {
					node.style.width = count + '%';
					node.style.float = 'left';
				});
			}
		},

		setViewportWidth(parent) {
			let form = parent;
			let viewport = form.querySelector('.donate_landing__viewport');
			viewport.style.width = '300%';
		},

		showCard() {
			Object.keys(this.card).map(key => {
				if (key === this.cardType) {
					return this.card[key] = true;
				} else {
					return this.card[key] = false;
				}
			});
		},

		cleanNumber(keypath) {
			let val = this.$get(keypath);
			this.$set(keypath, val.replace(/[^0-9]+/, ''));
		},

		maxLength(keypath, length) {
			let val = this.$get(keypath);
			this.$set(keypath, val.substring(0, length));
		},

		isRequired(keypath) {
			let error = {};
			let val = this.$get(keypath) ? this.$get(keypath) : '';

			if (val === '') {
				error[keypath] = true;
			} else {
				error[keypath] = false;
			}

			return error;
		},

		createToken() {
			let stripeData = {
				number: this.stripe.number,
				cvc: this.stripe.cvc,
				exp_month: this.stripe.exp_month,
				exp_year: this.stripe.exp_year
			};

			this.toggleLoading();

			//send wp_ajax to get token
			let data = {
				action: 'stripe_token',
				data: stripeData
			};

			$.ajax({
				type: 'post',
				url: '/wp-admin/admin-ajax.php',
				data: data
			})
			.done(res => this.handleToken(res));

		},

		handleToken(response) {
			this.toggleLoading();

			if (response.id) {
				this.stripe.token = response.id;
				this.nextSection();
			}

			if (response.error) {
				this.errors = {
					stripe: response.error.message
				};

			
			}
		},

		contactValidations() {
			let fields = [
				'contact.name',
				'contact.email',
				'contact.country'
			];

			let errors = {};

			fields.forEach((key) => {
				let validation = this.isRequired(key);
				if(validation[key]) {
					errors = {...errors, ...validation};
				}
			});

			this.errors = errors;
		},

		showErrors() {
			this.$set('errors.stripe', validateStripe(this.stripe).errors);
		},

		removeErrors() {
			this.errors = {};
		},

		toggleLoading() {
			this.loading = !this.loading;
		},

		cleanData() {
			this.stripe = {...this.stripe, ...componentData.stripe};
			this.contact = {...this.contact, ...componentData.contact};
		},

		getToken(e) {
			e.preventDefault();

			if (validateStripe(this.stripe).success) {
				this.removeErrors();
				this.createToken();
			} else {
				this.showErrors();
				this.changeViewportHeight(2);
			}
		},

		onSubmit(e) {
			const { contact, currency, amount, donation_type, stripe: {token} } = this;
			let data = { ...contact, currency, amount, donation_type, stripe_token: token};

			e.preventDefault();
			this.contactValidations();
			this.toggleLoading();
			

			if(Object.keys(this.errors).length == 0) {
				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					type: 'post',
					data: {
						action: 'stripe_charge',
						data: data
					},
					beforeSend: () => {
						this.removeErrors();
					}
				})
				.then(res => {
					if (res.id) this.success = true;
				});
			} else {
				this.toggleLoading();
				this.changeViewportHeight( 3 );
			}
		},

		changeType(type, evt) {
			evt.preventDefault();
			this.donation_type = type;
		},

		sendEccomerceData(response) {
			if (this.donation_type == 'monthly') {
				gaEvents.donateMonthly();
				if (gaEcommerce) gaEcommerce(response.stripe.id, null, this.amount);
				if (fbq) fbq('track', 'Purchase', {
					value: this.amount,
					currency: 'EUR'
				});

			}

			if (this.donation_type == 'once') {
				gaEvents.donateUnique();
				if (gaEcommerce) gaEcommerce(response.stripe.id, null, this.amount);
				if (fbq) fbq('track', 'Purchase', {
					value: this.amount,
					currency: this.currency
				});
			}
		},

		handleSubmitResponse(res) {
			let response = {};

			try {
				response = JSON.parse(res);
			} catch (e) {
				this.removeErrors();
			}

			this.toggleLoading();

			if (response.success) {
				this.removeErrors();
				this.success = true;
				this.sendEccomerceData(response);

				let subdata = `?customer_id=${response.stripe.customer}&order_revenue=${this.amount}&order_id=${response.stripe.id}&landing_thanks=true&landing_revenue=${this.amount}`;

				window.location = '/landing-thanks/' + subdata;

			} else if (response.errors) {
				this.errors = response.errors;
			}
		},

		changeViewportHeight(section = 1) {
			let parent = this.$el;
			let nodeSection = parent.querySelector(`.donate_landing__section-${section}`);
			let height = nodeSection.offsetHeight;
			let viewport = document.querySelector('.donate_landing__viewport');
			viewport.style.height = `${height}px`;
		},

		nextSection() {
			let parent = this.$el;
			let section = this.section;
			let progress = 100 / 3 * (section + 1);
			let viewport = parent.querySelector('.donate_landing__viewport');
			let next = section * 100;
			viewport.style.left = `-${next}%`;
			this.changeViewportHeight( section + 1 );			
			this.progress = `${progress}%`;
			this.section = section + 1;
		},

		backSection() {
			let parent = this.$el;
			let section = this.section;
			let form = parent;
			let viewport = parent.querySelector('.donate_landing__viewport');
			let width = form.offsetWidth;
			let actual = width * (section - 1);
			let prev = actual - width;
			this.changeViewportHeight(section - 1);
			viewport.style.left = `-${prev}px`;
			this.section = section - 1;
			let progress = 100 / 3 * (section - 1);
			this.progress = `${progress}%`;
		},

		cardValidation(action = {type: '', field: ''}) {
			const {type, field} = action;
			let isValid = Stripe.card[type](this.$get(field)); 
			
			if(isValid) {
				this.$set(`errors.${field}`, !isValid);
			} else {
				this.$set(`errors.${field}`, !isValid);
			}

			console.log(this.errors);
		}

	},

	template: `
    <form method="post" class="donate_landing">
      <div class="donate_landing__viewport">

      <div class="donate_landing__section donate_landing__section-1">
        <div class="donate_landing__section__title col-sm-12">
          <h3 class="color-red">{{texts.sectionOne.title}}</h3>
          <p>{{texts.sectionOne.content}}</p>
        </div>
      
        <change-amount></change-amount>

          <div class="form-group col-md-7 col-sm-8" style="float: left">
            <div class="input-group col-sm-12" >
              <div class="input-group-addon">USD</div>
              <input
                type="text"
                class="form-control"
                v-model="amount"
                v-el:amount-input
                v-on:keyup="cleanNumber('amount')"
                placeholder="{{placeholders.amount}}"
              >
            </div>
          </div>

          <div class="col-md-5">
            <a 
              href="#"
              v-on:click="changeType('monthly', $event)"
              v-bind:class="[donation_type == 'monthly' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            >
              {{monthly}}
            </a>
            
            <a
              href="#" 
              v-on:click="changeType('once', $event)"
              v-bind:class="[donation_type == 'once' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            >
            {{once}}
          </a>
          </div>

        <div class="col-xs-12">
          <button class="donate_landing__submit pull-left" v-on:click.prevent="nextSection">
            {{texts.sectionOne.btn}}
          </button>

          <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>
        </div>
      </div> <!-- donate_landing__section-1 -->

      <div class="stripe-info donate_landing__section donate_landing__section-2" >
        <div class="donate_landing__section__title col-sm-12">
          <h3 class="color-red">{{texts.sectionTwo.title}}</h3>
          <p>{{texts.sectionTwo.content}}</p>
        </div>

           <div class="row">

          <div class="form-group col-sm-12 donate_landing__cards">
            <img 
              v-bind:class="{'card-type--active': card.Visa}" 
              class="card-type" 
              :src="cardSrc.Visa" 
            >

            <img
              v-bind:class="{'card-type--active': card.MasterCard}" 
              class="card-type" 
              :src="cardSrc.MasterCard" 
            >

            <img 
              v-bind:class="{'card-type--active': card.DinersClub}" 
              class="card-type" 
              :src="cardSrc.DinersClub" 
            >
            
            <img 
              v-bind:class="{'card-type--active': card.AmericanExpress}" 
              class="card-type" 
              :src="cardSrc.AmericanExpress" 
            >

            <img 
              v-bind:class="{'card-type--active': card.Discover}" 
              class="card-type" 
              :src="cardSrc.Discover" 
            >
          </div>
        
        </div>

        <div class="form-group col-sm-12">
          <input
            type="text"
            v-on:keyup="[cardValidation({type: 'validateCardNumber', field: 'stripe.number'}), cleanNumber('stripe.number'), maxLength('stripe.number', 16), showCard()]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.stripe.number}"
            v-model="stripe.number"
            placeholder="{{placeholders.creditCard}}"
          >

          <span class="form-group__error" v-if="errors.stripe.number">
            {{validationMessages.card}}
          </span>
        </div>

        <div class="form-group col-xs-4">
          <input
            type="text"
            v-on:keyup="[cardValidation({type: 'validateExpiry'}), cleanNumber('stripe.exp_month'), maxLength('stripe.exp_month', 2)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.stripe.exp_month}"
            style="text-align: center;"
            placeholder="{{placeholders.month}}"
            v-model="stripe.exp_month"
          >

          <span class="form-group__error" v-if="errors.stripe.exp_month">
            {{validationMessages.month}}  
          </span> 
        </div>

        <div class="form-group col-xs-4" >
          <input
            type="text"
            v-on:keyup="[cleanNumber('stripe.exp_year'), maxLength('stripe.exp_year', 2)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.stripe.exp_year}"
            style="text-align: center;"
            placeholder="{{placeholders.year}}"
            v-model="stripe.exp_year"
          >

           <span class="form-group__error" v-if="errors.stripe.exp_year">
             {{validationMessages.year}}
           </span>
        </div>

        <div class="form-group col-xs-4">
          <input
            type="text"
            v-on:keyup="[cleanNumber('stripe.cvc'), maxLength('stripe.cvc', 4)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.stripe.cvc}"
            style="text-align: center;"
            v-model="stripe.cvc"
            placeholder="{{placeholders.cvc}}"
          >
           <span class="form-group__error" v-if="errors.stripe.cvc">
             {{validationMessages.cvc}}
           </span>
        </div>

        <div class="col-md-12">
            <button 
              class="donate_landing__submit donate_landing__submit-get_token pull-left" 
              v-on:click.prevent="getToken" 
              :disabled="loading"
            >
            {{texts.sectionTwo.btn}}
            </button>

             <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>

            <button v-on:click.prevent="backSection" class="donate_landing__back pull-right"> < {{backText}}</button>
            </div>
      </div><!-- donate_landing__section-2 -->


    <div class="donate_landing__section donate_landing__section-3" >
      <div class="donate_landing__section__title col-sm-12">
        <h3 class="color-red">{{texts.sectionThree.title}}</h3>
        <p>{{texts.sectionThree.content}}</p>
      </div>
        <div class="col-sm-12">
          <div class="form-group ">
            <input
              type="text"
              name="name"
              class="form-control form-control--outline"
              placeholder="{{placeholders.name}}"
              v-model="contact.name"
              >
               <span class="form-group__error" v-if="errors['contact.name']">
                 {{validationMessages.name}}
              </span>
          </div>
        </div>

        <div class="col-sm-12">
          <div class="form-group">
            <input
              type="text"
              name="email"
              class="form-control form-control--outline"
              placeholder="{{placeholders.email}}"
              v-model="contact.email"
            >

            <span class="form-group__error" v-if="errors['contact.email']">
               {{validationMessages.email}}
            </span>
          </div>
        </div>

        <div class="col-sm-12">
          <div class="form-group">
            <select class="form-control form-control--outline" name="country" v-model="contact.country">
                <option value="{{country}}" v-for="country in countries">{{country}}</option>
            </select>
            <span class="form-group__error" v-if="errors['contact.country']">
               {{validationMessages.country}}
            </span>
          </div>
        </div>
  
      <div class="col-md-12">
        
        <button 
          class="donate_landing__submit pull-left" 
          v-on:click.prevent="onSubmit" 
          :disabled="loading"
        >
          {{texts.sectionThree.btn}}
        </button>
        <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>
        <button v-on:click.prevent="backSection" class="donate_landing__back pull-right">{{backText}}</button>
      </div>
    </div><!-- donate_landing__section-3 -->
    </div><!-- viewport -->

  </div> <!-- success -->
  <div class="form-group col-xs-12">
    <div class="pro-bar">
      <div class="pro-bar__status" v-bind:style="{width: progress}"></div>
    </div>
  </div>

   <div class="form-group col-sm-12">
      <a style="padding-top: 30px" v-bind:href="link.anchor">
        <h4 class="color-red">{{link.text}}</h4> <i class="ion-chevron-down color-red"></i>
      </a>
    </div>

  </form>

  </div>
	`
});