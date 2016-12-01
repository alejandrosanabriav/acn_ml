'use strict';
import approve from 'approvejs';

export default () => {

	return {
		props: [
			'placeholders', 
			'texts',
			'rules',
			'baseUri',
			'redirect',
			'type'
		],

		data() {
			return {
				name: '',
				email: '',
				accept: false,
				prayLogo: '',
				country: '',
				countries: [],
				errors: {},
				loading: false
			};
		},

		init() {
			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				data: {action: 'countries'}
			})
			.then(res => this.countries = res)
			.then(() => {
				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					data: {action: 'user_location'}
				}).then(res => this.country = res.names.en);
			});
		},

		ready() {
			this.prayLogo = `${this.baseUri}/public/img/pray.svg`;
		},

		methods: {
			validateField(field = '') {
				const value = this.$get(field);
				
				if(this.rules[field]) {
					let result = approve.value(value, this.rules[field]);
					let {errors} = result;
					this.errors =  {...this.errors, [field]: errors};
				}
				
			},
			
			validateAll() {
				let fields = ['name', 'email', 'accept'];
				fields.forEach(field => this.validateField(field));
				let {name, email, accept} = this.$get('errors');
				let isValid = [name, email, accept].filter(err => err.length > 0);
				return isValid.length == 0;
			},

			hasErrors(field) {
				return this.errors[field] ? this.errors[field].length > 0 : false;
			},

			onSubmit() {
				const {name, email, country} = this;

				if(this.validateAll()) {
					ga('send', 'event', 'SUBSCRIPTION', 'SUBSCRIPTION', 'SUBSCRIPTION', 0);

					let data = {};

					if(this.type == 'mailchimp') {
						let mc_data = {
							email_address: email,
							status: 'subscribed',
							merge_fields: {'NAME': name, 'COUNTRY': country},
							update_existing: true
						};

						data = {action: 'mailchimp_subscribe', data: mc_data};
					} else {
						let infusion_data = {name, email, country, tags: '872'};
						data = {action: 'infusion_contact', data: infusion_data};
					}				

					$.ajax({
						type: 'post',
						url: '/wp-admin/admin-ajax.php',
						data: data,
					}).then(res => window.location = this.redirect);
				}
		
			}
		},

		template: `
			<form >
				<div class="form-group">
					<input 
						v-on:keyup="validateField('name')" 
						v-model="name"
						type="text" 
						class="form-control"
						v-bind:class="[hasErrors('name') ? 'form-group--error' : '']"
						placeholder="{{placeholders.name}}"
					>

					<span class="form-group__error" v-if="hasErrors('name')">
						{{errors.name}}
					</span>
				</div>
				<div class="form-group">
					<input 
						v-on:keyup="validateField('email')" 
						v-model="email"
						type="text"
						class="form-control"
						v-bind:class="[hasErrors('email') ? 'form-group--error' : '']"
						placeholder="{{placeholders.email}}"
					>
					<span class="form-group__error" v-if="hasErrors('email')">
						{{errors.email}}
					</span>
				</div>

				<div class="input_container input_container__select">
					<select name="" class="form-control" v-model="country">
						<option value="{{country}}" v-for="country in countries">{{country}}</option>
					</select>
				</div>

				<div class="checkbox form-group">
					<label class="checkbox__label">
						<input type="checkbox" v-model="accept"> {{texts.checkbox}}
					</label>
					<span class="form-group__error" v-if="hasErrors('accept')">
						{{errors.accept}}
					</span>
				</div>

				<div class="input_container">
					<button 
						class="btn-pray" 
						v-on:click.prevent="onSubmit" 
						disabled="{{this.loading}}"
					>
						<img v-bind:src="prayLogo" alt=""> {{texts.pray}}
					</button>
				</div>
			</form>
		`
	};
};
