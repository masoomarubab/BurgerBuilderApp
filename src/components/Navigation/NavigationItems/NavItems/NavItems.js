import React from "react";
import classes from './NavItems.css';

const navItems = (props) => (
    <li className="NavItem">
        <a href={props.link} className={props.active ? 'active' : null}> {props.children} </a>
    </li>
);

export default navItems;