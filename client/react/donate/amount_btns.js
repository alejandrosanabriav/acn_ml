import React from 'react';

const AmountBtns = React.createClass({
render() {
	const {changeAmount, texts} = this.props;

	return (
			<ul className="change-amount" style={{padding: 0}}>
				<li className="col-md-2"> 
					<a href="#" onClick={changeAmount.bind(null, 10)}>$10</a> 
				</li>
				<li className="col-md-2"> 
					<a href="#" onClick={changeAmount.bind(null, 30)}>$30</a> 
				</li>
				<li className="col-md-2"> 
					<a href="#" onClick={changeAmount.bind(null, 50)}>$50</a> 
				</li>
				<li className="col-md-2"> 
						<a href="#" onClick={changeAmount.bind(null, 100)}>$100</a> 
				</li>
				<li className="col-md-2"> 
					<a href="#" onClick={changeAmount.bind(null, 5)}>{texts.other}</a> 
				</li>
			</ul>
	)
}
});

export default AmountBtns;