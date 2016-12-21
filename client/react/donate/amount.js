import React from 'react';

const amount = React.createClass({
	getDefaultProps() {
		return {
			other: 'Other'
		}
	},
	
	getInitialState() {
		return {
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

	render() {
		return (
			<div>
				<ul>
					<li> <a href="#" onClick={this.changeAmount.bind(null, 10)}>10</a> </li>
					<li> <a href="#" onClick={this.changeAmount.bind(null, 30)}>30</a> </li>
					<li> <a href="#" onClick={this.changeAmount.bind(null, 50)}>50</a> </li>
					<li> <a href="#" onClick={this.changeAmount.bind(null, 100)}>100</a> </li>
					<li> <a href="#" onClick={this.changeAmount.bind(null, 5)}>{this.props.other}</a> </li>
				</ul>
				<input ref="amountInput" type="text" onChange={this.handleAmount} value={this.state.amount} />
				<a href="#" onClick={this.changeType.bind(null, 'monthly')}>Monthly</a>
				<a href="#" onClick={this.changeType.bind(null, 'once')}>Once</a>
			</div>
		)
	}
});

export default amount;