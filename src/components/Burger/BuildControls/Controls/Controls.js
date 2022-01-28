import React from "react";
import classes from './Controls.css';

const Controls = (props) => (
    <div className="Controls">
        <div className="Label">{props.label}</div>
        <button className="Less" onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className="More" onClick={props.added}>More</button>
    </div>
    
);
export default Controls;