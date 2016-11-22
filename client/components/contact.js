'use strict';
import $ from 'jquery';
import approve from 'approvejs';

export default () => {
	
	return {
		props: [
			'placeholders', 
			'texts',
			'country',
			'baseUri'
		],

		data() {
			return {
				name: '',
				email: '',
				prayLogo: '',
				countries: [],
				errors: {},
				rules: {
					name: {
						required: {message: 'Nombre requerido'}
					},
					email: {
						email: {message: 'Email incorrecto'}
					}
				}
			};
		},

		init() {
			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				data: {action: 'countries'}
			}).then(res => this.countries = res);
		},

		ready() {
			this.prayLogo = `${this.baseUri}/public/img/pray.svg`;
		},

		methods: {
			validateField(field = '') {
				const value = this.$get(field);
				console.log( this.rules[field] );
				let result = approve.value(value, this.rules[field]);
				let {errors} = result;
				this.errors =  {...this.errors, [field]: errors};
			},
			
			validateAll() {
				let fields = ['name', 'email', 'country'];
				fields.forEach(field => this.validateField({rules: {}, field}));
			},

			hasErrors(field) {
				return this.errors[field] ? this.errors[field].length > 0 : false;
			},

			onSubmit() {
				const {name, email, country} = this;
				this.validateAll();
				let bounce = {
					email_address: email,
					status: "subscribed",
					merge_fields: {"NAME": name, "COUNTRY": country},
					update_existing: true
				};      

				bounce = {action: 'mailchimp_subscribe', data: bounce};
				console.log(bounce);
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

				<div class="input_container">
					<button class="btn-pray" v-on:click.prevent="onSubmit"><img v-bind:src="prayLogo" alt="">{{texts.pray}}</button>
				</div>
			</form>
		`
	};
};
