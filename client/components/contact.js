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
				countries: []
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
			validateField(action = {type: '', field: ''}) {
				const {type, field} = action;
				const value = this.$get(field);
				var rules = {
					required: {
						message: 'es requerido'
					},
					email: {
						message: 'email incorrecto'
					}
				};

				var result = approve.value(value, rules);
				console.log(result);
			},

			onSubmit() {
				const {name, email, country} = this;
				console.log({name, email, country});
			}
		},

		template: `
			<form >
				<div class="input_container">
					<input 
						v-bind:keyup="validateField({type: 'required', field: 'name'})" 
						v-model="name"
						type="text" 
						class="form-control"
						placeholder="{{placeholders.name}}"
					>
				</div>
				<div class="input_container">
					<input 
						v-bind:keyup="validateField({type: 'email', field: 'email'})" 
						v-model="email"
						type="text" 
						class="form-control"
						placeholder="{{placeholders.email}}"
					>
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
