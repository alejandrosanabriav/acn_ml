import React from 'react';

const Contact =React.createClass({
	render() {
		const {texts} = this.props;
		return (
			<div>
				<div class="form-group">
					<input type="text" class="form-control" placeholder={texts.placeholder_name} />
				</div>
			</div>
		)
	}
});

export default Contact;