import React from "react";
import burgerLogo from '../../assets/Images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className="Logo" style = {{height : props.height}}>
        <img src={burgerLogo} alt="Burger Logo"></img>
    </div>
);

export default logo;