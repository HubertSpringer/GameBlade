import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import React from 'react';

const controls = [
	{ label: 'Salad', type: 'salad'},
	{ label: 'Bacon', type: 'bacon'},
	{ label: 'Cheese', type: 'cheese'},
	{ label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map(ctrl => (
		<BuildControl 
			key={ctrl.label} 
			label={ctrl.label} 
			removed={() => props.ingredientRemoved(ctrl.type)}
			added={() => props.ingredientAdded(ctrl.type)} 
			disabled={props.disabled[ctrl.type]}/>))}
		<button 
			className={classes.OrderButton}
			onClick={props.purchasingHandler}
			disabled={!props.purchaseable}>ORDER NOW</button>
	</div>
);

export default buildControls