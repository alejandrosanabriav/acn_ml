import React from 'react';
import Amount from './amount';
import CreditCard from './credit_card';
import Contact from './contact';

const Donate = React.createClass({
	getInitialState() {
		return {
			donation_type: 'monthly',
			amount: 30,
			texts: {
				creditcard_placeholder: 'Credit Card number',
				month_placeholder: 'MM',
				year_placeholder: 'YY',
				cvc_placeholder: 'CVC',
				other: 'Other',
				monthly: 'Monthly',
				once: 'Once'
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
			console.log(err);
		}
	},

	componentWillMount(){
		this.getProps();
	},

	onlyNum(val) {
		return val.replace(/[^0-9]+/, '');
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
					onChange={this.handleChange}  
				/>

				<Contact
					{...this.state}
					onChange={this.handleChange} 
				 />
			</div>
		)
	}

});

export default Donate;