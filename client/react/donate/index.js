import React from 'react';
import validator from 'validator';
import Amount from './amount';
import CreditCard from './credit_card';
import Contact from './contact';

const Donate = React.createClass({
	getInitialState() {
		return {
			donation_type: 'monthly',
			amount: 30,
			currency: 'usd',
			countries: [],
			contact: {
				name: '',
				email: '',
				country: ''
			},
			stripe: {
				card_type: 'visa',
				number: '',
				exp_month: '',
				exp_year: '',
				cvc: '',
				token: ''
			},
			texts: {},
			errors: {
				stripe: {},
				contact: {}
			}
		}
	},

	getProps() {
		let a = document.getElementById('bs-donate-react');
		let props = a.getAttribute('data-props');
		let texts = this.state.texts;

		try {	
			props = JSON.parse(props);
			texts = {...texts,  ...props};
			this.setState({texts});
		} catch(err) {
			console.log('err on parsing donate props', props);
		}
	},

	fetchCountries() {
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'countries'}
		}).then(res => this.setState({countries: res}));
	},

	componentWillMount(){
		this.getProps();
		this.fetchCountries();
	},

	onlyNum(val) {
		return val.replace(/[^0-9]+/, '');
	},

	maxLength(val, length) {
		return val.substring(0, length);
	},

	handleChange(field) {
		this.setState({...this.state, ...field});
	},

	handleSubmit() {

			let data = {
				action: 'stripe_token',
				data: this.state.stripe
			};

			$.ajax({
				type: 'post',
				url: '/wp-admin/admin-ajax.php',
				data: data
			})
			.then(res => this.setState({stripe: {...this.state.stripe, token: res.id}}))
			.then(res => console.log('another then', this.state.stripe));
	},

	stripeCharge() {
		const { contact, currency, amount, donation_type, stripe: {token} } = this.state;
		let data = { ...contact, currency, amount, donation_type, stripe_token: token};

		let request = $.ajax({
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: {
				action: 'stripe_charge',
				data: data
		}});

		return request;
	},

	render() {
		return (
			<div>
				<Amount 
					{...this.state} 
					onlyNum={this.onlyNum} 
					onChange={this.handleChange} 
				/>

				<CreditCard 
					{...this.state}
					onlyNum={this.onlyNum} 
					maxLength={this.maxLength}
					onChange={this.handleChange} 
					validateStripe={this.validateStripe}
				/>

				<Contact
					{...this.state}
					onChange={this.handleChange} 
				 />

				 <div className="form-group">
					 <button className="donate_landing__submit pull-left" onClick={this.handleSubmit}>Donate</button>
				 </div>
				 
			</div>
		)
	}

});

export default Donate;