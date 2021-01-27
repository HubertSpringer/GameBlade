 import React , { Component} from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				defaultValue: '',
				value: '',
				validation: {
					required: true,
					valid: false
				},
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				defaultValue: '',
				value: '',
				validation: {
					required: true,
					valid: false
				},
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				defaultValue: '',
				value: '',
				validation: {
					minLength: 5,
					maxLength: 5,
					required: true,
					valid: false
				},
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				defaultValue: '',
				value: '',
				validation: {
					required: true,
					valid: false
				},
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				defaultValue: '',
				value: '',
				validation: {
					required: true,
					valid: false
				},
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest'},
						{ value: 'cheapest', displayValue: 'Cheapest'},
					]
				},
				value: ''
			},
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		this.setState( { loading: true } );
		const formData = {};
		for(let formElementId in this.state.orderForm){
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}
		
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: true, });
			});
	}

	checkValidity(value, rules){
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !=='' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier ) => {
		const updatedOrderForm = {
			...this.state.orderForm 
		};
		const updatedFormelement = {
			...updatedOrderForm[inputIdentifier]
		};
 
		updatedFormelement.value = event.target.value;
		updatedFormelement.validation.valid = this.checkValidity(updatedFormelement.value, updatedFormelement.validation);
		console.log(updatedFormelement.validation.valid);

		updatedOrderForm[inputIdentifier] = updatedFormelement;

		this.setState({orderForm: updatedOrderForm});
	}

	render(){
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				Id: key,
				config: this.state.orderForm[key],
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
					key={formElement.Id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.Id)} />
				))}
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
			</form>);

		if(this.state.loading){
			form = <Spinner />;
		}	

		return(
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData;