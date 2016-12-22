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
			texts: {
				creditcard_placeholder: 'Credit Card number',
				month_placeholder: 'MM',
				year_placeholder: 'YY',
				cvc_placeholder: 'CVC',
				other: 'Other',
				monthly: 'Monthly',
				once: 'Once'
			},
			errors: {}
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

	componentWillMount(){
		this.getProps();
	},

	onlyNum(val) {
		return val.replace(/[^0-9]+/, '');
	},

	maxLength(length) {
		return val.substring(0, length);
	},

	handleChange(field) {
		this.setState({...this.state, ...field});
	},

	validateStripe(val) {
		let valid = Stripe.card.validateCardNumber(val);
		let errors = {stripe: {number: valid}};
		this.setState({...this.state, errors});
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
					validateStripe={this.validateStripe}
					onlyNum={this.onlyNum} 
					maxLength={this.maxLength}
					onChange={this.handleChange}  
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