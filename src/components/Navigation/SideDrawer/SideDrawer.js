import React from "react";
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";
import classNames from 'classnames';

const SideDrawer = (props) => {
    let attachedClasses = [ classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [ classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

export default SideDrawer;