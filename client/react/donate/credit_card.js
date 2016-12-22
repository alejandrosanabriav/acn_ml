import React from 'react';
import Cards from './cards';

const CedritCard = React.createClass({

	render() {
		const {texts} = this.props;

		return (
			<div>
			<Cards {...this.props} />
			<div className="form-group">
				<input 
					type="text" 
					placeholder={texts.creditcard_placeholder} 
					className="form-control" 
				/>
			</div>
			<div className="row">
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
		</div>
		)
	}
});

export default CedritCard;