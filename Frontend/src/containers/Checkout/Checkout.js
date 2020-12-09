import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

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
		this.props.history.replace('/burger/checkout/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.state.ingedients}
					onCheckoutContinue={this.checkoutContinueHandler}
					onCheckoutCancel={this.checkoutCancelHandler} />

				<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
			</div>
		)
	}
}

export default Checkout;