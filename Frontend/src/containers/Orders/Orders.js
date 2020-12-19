import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Orders extends Component {
	render (){
		return (
			<Auxiliary>
				<Order></Order>
				<Order></Order> 
			</Auxiliary>
		);
	}
}

export default Orders;