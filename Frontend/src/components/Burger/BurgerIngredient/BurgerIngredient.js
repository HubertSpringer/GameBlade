import React from 'react';
import PropTypes from 'prop-types';
import classes from './burgerIngredient.css'

const burgerIngredient = (props) => {
	let ingredient = null;

	switch(props.type){
		case('bread-bottom'):
			ingredient = <div className={classes.BreadBottom} />;
			break;
		case('bread-top'):
			ingredient = (
				<div className={classes.BreadTop}>
					<div className={classes.Seeds1} />
					<div className={classes.Seeds2} />
				</div>
			);
			break;
		case('meat'):
			ingredient = <div className={classes.Meat} />;
			break;
		case('cheese'):
			ingredient = <div className={classes.Cheese} />;
			break;
		case('salead'):
			ingredient = <div className={classes.Salad} />;
			break;
		case('bacon'):
			ingredient = <div className={classes.Bacon} />;
			break;
		default:  
			ingredient = null;
			console.error("Bad ingrediant type.")
	}

	return ingredient;
};

burgerIngredient.PropTypes = {
	type: PropTypes.string.isRequired
}

export default burgerIngredient