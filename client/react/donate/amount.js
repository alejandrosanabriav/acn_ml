import React from 'react';

const amount = React.createClass({

	changeAmount(amount,e) {
		if(e) e.preventDefault();
		let el = this.refs.amountInput;
		if(amount == 5) el.focus();
		this.props.onChange({amount});
	},

	handleAmount(e) {
		let el = e.currentTarget;
		let amount = this.props.onlyNum(el.value);
		this.props.onChange({amount});
	},

	changeType(donation_type, e) {
		if(e) e.preventDefault();
		this.props.onChange({donation_type});
	},

	render() {
		const {texts, donation_type, amount} = this.props;

		return (
			<div className="row">
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
					<input ref="amountInput" className="form-control" type="text" onChange={this.handleAmount} value={amount} />
				</div>
				<div className="form-group col-xs-5">
					<a href="#" 
						onClick={this.changeType.bind(null, 'monthly')} 
						style={donation_type == 'monthly' ? {color: 'red'} : {}}
					>
					{texts.monthly}
				</a>
				<a href="#" 
						onClick={this.changeType.bind(null, 'once')} 
						style={donation_type == 'once' ? {color: 'red'} : {}}
					>
					{texts.once}
				</a>
				</div>
				
			</div>
		)
	}
});

export default amount;