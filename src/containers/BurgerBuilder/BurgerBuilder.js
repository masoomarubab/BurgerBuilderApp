import React,{ Component } from "react";
import Aux from '../../hoc/Auxiliary'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    bacon:0.7,
    salad:0.5,
    meat:1.3,
    cheese:0.4
}

class BurgerBuilder extends Component{
    state = {
        ingredients:{       
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            // console.log(igKey)
            // console.log(ingredients[igKey])
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el
        },0)

        this.setState({purchaseable : sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients : updateIngredients
        })
        this.updatePurchaseState(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients : updateIngredients
        })
        this.updatePurchaseState(updateIngredients)
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler= () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler= () => {
        alert('Order has been placed Love!');
    }
    render(){
        // {salad:true, meat:false ....}
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price={this.state.totalPrice}
                ordered = {this.purchaseHandler}
                purchaseable = {this.state.purchaseable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;