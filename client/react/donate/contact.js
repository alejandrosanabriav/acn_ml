import React from 'react';

const Contact =React.createClass({
	render() {
		const {texts} = this.props;
		return (
			<div>
				<div className="form-group">
					<input 
						type="text" 
						className="form-control" 
						placeholder={texts.placeholder_name} 
					/>
				</div>
				<div className="form-group">
					<input 
						type="text" 
						className="form-control" 
						placeholder={texts.placeholder_email} 
					/>
				</div>
				
			</div>
		)
	}
});

export default Contact;