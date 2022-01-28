import React from "react";
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    // here we are passing JS object which has been transferring to an array using map() method
    // in first map() method we have two elements of the array whuch are key-value pair of object
    // in 2nd map() method we are using that element for our BurgerIngredient component 
    // in reduce() method we are reducing our multiple arrays into one array
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[])

    if(transformedIngredients.length === 0){
        transformedIngredients=<h5>Please start adding ingredients love!</h5>
    }
    // console.log(transformedIngredients)
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;