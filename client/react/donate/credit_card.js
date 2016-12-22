import React from 'react';

const CedritCard = React.createClass({

	render() {
		const {texts} = this.props;

		return (
			<div>
			<div className="form-group">
				<input 
					type="text" 
					placeholder={texts.creditcard_placeholder} 
					className="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.month_placeholder} 
					className="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.year_placeholder} 
					className="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.cvc_placeholder} 
					className="form-control" 
				/>
			</div>
		</div>
		)
	}
});

export default CedritCard;