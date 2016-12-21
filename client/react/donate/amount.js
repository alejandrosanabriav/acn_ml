import React from 'react';

const amount = React.createClass({
	getInitialState() {
		return {
			texts: {
				other: 'Other',
				monthly: 'Monthly',
				once: 'Once'
			},
			amount: 30,
			donation_type: 'monthly'
		}
	},

	changeAmount(amount,e) {
		if(e) e.preventDefault();
		let el = this.refs.amountInput;
		console.log(this.refs.amountInput, amount);
		if(amount == 5) el.focus();
		this.setState({amount});
	},

	handleAmount(e) {
		let el = e.currentTarget;
		let amount = el.value;
		this.setState({amount});
	},

	changeType(donation_type, e) {
		if(e) e.preventDefault();
		this.setState({donation_type});
	},

	componentDidMount() {
		let a = document.getElementById('bs-donate-react');
		let props = a.getAttribute('data-props');
		try {	
			props = JSON.parse(props);
			this.setState({this.state.text, texts: props})
		} catch(err) {
			console.log(err);
		}
	},

	render() {
		const {texts} = this.props;
		return (
			<div>
				<ul>
					<li> 
						<a href="#" onClick={this.changeAmount.bind(null, 10)}>10</a> 
					</li>
					<li> 
						<a href="#" onClick={this.changeAmount.bind(null, 30)}>30</a> 
					</li>
					<li> 
						<a href="#" onClick={this.changeAmount.bind(null, 50)}>50</a> 
					</li>
					<li> 
						<a href="#" onClick={this.changeAmount.bind(null, 100)}>100</a> 
					</li>
					<li> 
						<a href="#" onClick={this.changeAmount.bind(null, 5)}>{texts.other}</a> </li>
				</ul>

				<input ref="amountInput" type="text" onChange={this.handleAmount} value={this.state.amount} />

				<a href="#" 
					onClick={this.changeType.bind(null, 'monthly')} 
					style={this.state.donation_type == 'monthly' ? {color: 'red'} : {}}
				>
					{texts.monthly}
				</a>
				<a href="#" 
					onClick={this.changeType.bind(null, 'once')} 
					style={this.state.donation_type == 'once' ? {color: 'red'} : {}}
				>
					{texts.once}
				</a>
			</div>
		)
	}
});

export default amount;