import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingedients : {
			salad: 1,
			meat: 1
		}
	}

	render() {
		return (
			<div>
				<CheckoutSummary ingredients={this.state.ingedients} />
			</div>
		)
	}
}

export default Checkout;