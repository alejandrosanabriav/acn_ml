import React from 'react';
import Amount from './amount';

const Donate = React.createClass({
	getInitialState() {
		return {
			texts: {}
		}
	},

	componentWillMount(){
		let a = document.getElementById('bs-donate-react');
		let props = a.getAttribute('data-props');
		let texts = this.state.texts;
			console.log(props);

		try {	
			props = JSON.parse(props);
			
			texts = {...texts,  ...props};
			console.log(texts);
			this.setState({texts});
		} catch(err) {
			console.log(err);
		}
	},

	render() {
		return (
			<div>
				<Amount texts={this.state.texts} />
			</div>
		)
	}

});

export default Donate;