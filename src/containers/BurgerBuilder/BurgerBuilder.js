import React,{ Component } from "react";
import Aux from '../../hoc/Auxiliary'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        purchasing: false,
        loading: false
    }

    // componentDidMount() {
    //     axios.get('https://burgerbuilder-b9f54-default-rtdb.firebaseio.com/ingredients.json')
    //     .then( response => {
    //         this.setState( { ingredients: response.data } );
    //     } )
    //     .catch( err => {
    //         this.setState( {error :  true})
    //     });
    // }

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
        this.setState( { loading : true })
        const order ={
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Masooma',
                address : {
                    street : 'TestStreet',
                    zipCode : '12345',
                    country : 'Pakistan'
                },
                email : 'xyz@gmail.com'
            },
            deliveryMethod : 'Fastest'
        }
        // alert('Order has been placed Love!');
        axios.post('/orders.json', order)
        .then( response => {
            this.setState( { loading : false, purchasing : false })
        }).catch(err => {
            this.setState( { loading : false, purchasing : false })
        })
    }
    render(){
        // {salad:true, meat:false ....}
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;

        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux> 
        )
    }
}

export default withErrorHandler(BurgerBuilder , axios);