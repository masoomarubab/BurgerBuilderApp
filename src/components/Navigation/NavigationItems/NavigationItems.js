import React from "react";
import classes from './NavigationItems.css';
import NavItems from '../NavigationItems/NavItems/NavItems';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavItems link="/" active>Burger Builder</NavItems>
        <NavItems link="/">Checkout</NavItems>
    </ul>
);

export default navigationItems;