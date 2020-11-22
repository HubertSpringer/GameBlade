import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if(props.open){
		attachedClasses = [classes.SideDrawer, classes.open]
	}

	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<Logo height="11%" marginBottom="32px"/>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Auxiliary>
	);
}

export default sideDrawer