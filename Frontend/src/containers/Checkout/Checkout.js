import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingedients : {}
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		for(let param of query.entries()){
			ingredients[param[0]] = +param[1];
		}
	
		this.setState({ingedients: ingredients})
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/burger/checkot/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.state.ingedients}
					onCheckoutContinue={this.checkoutContinueHandler}
					onCheckoutCancel={this.checkoutCancelHandler} />
			</div>
		)
	}
}

export default Checkout;