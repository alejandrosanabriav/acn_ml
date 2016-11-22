'use strict';
import Validator from 'Validator';

export default () => {
	
	return {
		props: [
			'placeholders', 
			'texts',
			'country'
		],

		data() {
			return {
				name: '',
				email: '',
				countries: []
			};
		},

		methods: {
			validateField(action = {type: '', field: ''}) {
				const {type, field} = action;
				const val = this.$get(field);
				console.log(val);
				let v = Validator.make({[field]: val}, {[field]: type});

				if (v.fails()) {
        	let errors = v.getErrors();
        	console.log(errors);
    		}
			}
		},

		init() {
			console.log('hold you down');
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
				<div class="input_container">
					<select name="" class="form-control" v-model="country">
						<option value="{{country}}" v-for="country in countries">{{country}}</option>
					</select>
				</div>
				<div class="input_container">
					<button class="btn-pray">{{texts.pray}}</button>
				</div>
			</form>
		`
	};
};
