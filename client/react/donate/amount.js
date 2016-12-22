import React from 'react';

const amount = React.createClass({
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
		donation_type = donation_type.replace(/[^0-9]+/, '');
		this.setState({donation_type});
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
				<div className="form-group col-xs-7">
					<input ref="amountInput" className="form-control" type="text" onChange={this.handleAmount} value={this.state.amount} />
				</div>
				<div className="form-group col-xs-5">
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
				
			</div>
		)
	}
});

export default amount;