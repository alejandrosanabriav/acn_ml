import React from 'react';
import Amount from './amount';
import CreditCard from './credit_card';

const Donate = React.createClass({
	getInitialState() {
		return {
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

	render() {
		return (
			<div>
				<Amount texts={this.state.texts} />
				<CreditCard texts={this.state.texts} />
			</div>
		)
	}

});

export default Donate;