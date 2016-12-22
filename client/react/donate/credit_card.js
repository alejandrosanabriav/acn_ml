import React from 'react';

const CedritCard = React.createClass({
	render() {
		<div>
			<div className="form-group">
				<input 
					type="text" 
					placeholder={texts.creditcard_placeholder} 
					class="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.month_placeholder} 
					class="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.year_placeholder} 
					class="form-control" 
				/>
			</div>
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.cvc_placeholder} 
					class="form-control" 
				/>
			</div>
		</div>
	}
});

export default CedritCard;