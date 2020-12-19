import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
	state = {
		ingedients : {},
		price: 0,
	}

	componentWillMount () {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for(let param of query.entries()){

			if(param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
	
		this.setState({ingedients: ingredients, totalPrice: price})
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/burger/checkout/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingedients}
					onCheckoutContinue={this.checkoutContinueHandler}
					onCheckoutCancel={this.checkoutCancelHandler} />

				<Route 
				path={this.props.match.path + '/contact-data'} 
				component={ContactData}
				render={(props) => (<ContactData ingredients={this.state.ingedients} price={this.state.price} {...props} />)}/>
			</div>
		)
	}
}

export default Checkout;