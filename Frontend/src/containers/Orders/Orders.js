import axios from '../../axios-orders';
import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import WithErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	}
	componentDidMount(){
		axios.get('/orders.json')
			.then(response => {
				const fetchOrders = [];
				for(let key in response.data){
					fetchOrders.push({
						...response.data[key],
						Id: key
					});
				}

				this.setState({ loading: false, orders: fetchOrders });
			})
			.catch(error => {
				this.setState({ loading: false, });
			});
	}

	render (){
		return (
			<Auxiliary>
				{this.state.orders.map(order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={order.price} />
				))}
			</Auxiliary>
		);
	}
}

export default WithErrorHandler(Orders, axios);