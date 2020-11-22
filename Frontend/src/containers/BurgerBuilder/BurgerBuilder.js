import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 0.7,
	meat: 1.3
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
	}

	updatePurchaseState(ingredients){
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) =>{
				return sum + el;
			}, 0);

		this.setState({purchaseable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		updatedIngredients[type] = updatedCount;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients});

		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type];

		if(oldCount <= 0)
			return;

		let updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHanlder= () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHanlder= () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHanlder= () => {
		alert('You continue!');
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
					<OrderSummary 
						ingredients={this.state.ingredients}
						price = {this.state.totalPrice}
						cancel={this.purchaseCancelHanlder}
						continue={this.purchaseContinueHanlder}/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientRemoved = {this.removeIngredientHandler}
					ingredientAdded={this.addIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasingHandler = {this.purchaseHanlder}
					purchaseable={this.state.purchaseable}/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
