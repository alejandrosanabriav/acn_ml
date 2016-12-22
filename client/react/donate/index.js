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
				 	<button className="donate_landing__submit pull-left">Donate</button>
				 </div>
				 
			</div>
		)
	}

});

export default Donate;