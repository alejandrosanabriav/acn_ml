'use strict';
import _ from 'lodash';
import moment from 'moment';
import $ from 'jquery';
import gaEvents from '../ga_events';
import gaEcommerce from '../ga_ecommerce';
import validateStripe from '../stripe/validation.js';

function addStylesToNodes(parent) {
	let nodes = parent.querySelectorAll('.donate_landing__section');
	let count = 100 / nodes.length;

	let firstNode = parent.querySelector(`.donate_landing__section-1`);
	console.log('first node', firstNode);
	parent.querySelector('.donate_landing__viewport').style.height = `${firstNode.offsetHeight}px`;

	if (nodes.length) {
		Array.prototype.slice.call(nodes).forEach(node => {
			node.style.width = count + '%';
			node.style.float = 'left';
		});
	}
}

function setViewportWidth(parent) {
	let form = parent;
	let viewport = form.querySelector('.donate_landing__viewport');
	// viewport.style.width = `${num * width}px`;
	viewport.style.width = `300%`;
}

function configForm(parent) {
	addStylesToNodes(parent);
	setViewportWidth(parent);
}


let componentData = {
	donation_type: 'monthly',
	errors: {},
	success: false,
	loading: false,
	progress: '33.3%',
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
		country: null,
		stripe_token: null
	},

	card: {
		Visa: false,
		MasterCard: false,
		DinersClub: false,
		AmericanExpress: false,
		Discover: false
	},

	captcha: null,
	created_at: moment().format(),
	amount: 30,
	section: 1
};

export default () => ({
	template: '#donate-landing-template',

	props: [
		'captcha_name',
		'url',
		'currency',
		'country'
	],

	data() {
		return {...componentData};
	},

	ready() {
		configForm(this.$el);
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
			let errorAmount = this.isRequired('amount');
			this.errors = _.extend(validateStripe(this.stripe).errors, errorAmount);
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

			console.log('data', data); 
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
					currency: 'EUR'
				});
			}
		},

		handleSubmitResponse(res) {
			let response = {};

			try {
				response = JSON.parse(res);
			} catch (e) {
				this.removeErrors();
				console.log('donate response err: ', res);
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
		}
	}
});