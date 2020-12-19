import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 0.7,
	meat: 1.3
}

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);

		axios.get('https://odlotowyburger.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			})
			.catch(error => {
				this.setState({error: true})
			});
	  }

	state = {
		ingredients: null,
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		error: false
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
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}

		queryParams.push('price=' + this.state.totalPrice);
		this.props.history.push({
			pathname: '/burger/checkout',
			search: '?' + queryParams.join('&')
		});
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.state.error 
			? <p>Ingredients</p>
			: <Spinner /> ;
	
		if(this.state.loading)orderSummary = <Spinner />

		if(this.state.ingredients){
			burger  = (
				<Auxiliary>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredientRemoved = {this.removeIngredientHandler}
						ingredientAdded={this.addIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasingHandler = {this.purchaseHanlder}
						purchaseable={this.state.purchaseable}/>
				</Auxiliary>);

			orderSummary = <OrderSummary 
				ingredients={this.state.ingredients}
				price = {this.state.totalPrice}
				cancel={this.purchaseCancelHanlder}
				continue={this.purchaseContinueHanlder}/>
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
