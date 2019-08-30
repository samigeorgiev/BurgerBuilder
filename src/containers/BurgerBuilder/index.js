import React, { Component } from 'react';

import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';
import Modal from 'components/UI/Modal';
import OrderSummary from 'components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        totalPrice: 4,
        showModal: false
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients).map(key => (
            ingredients[key]
        )).reduce((sum, el) => (
            sum + el
        ), 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = type => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = type => {
        if (this.state.ingredients[type] === 0) { return; }
        const newCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchasable(updatedIngredients);
    }

    modalHandler = () => {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const disabledButtons = {
            ...this.state.ingredients
        };
        // eslint-disable-next-line
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] === 0;
        }
        return (
            <>
                <Modal show={this.state.showModal} close={this.modalHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButtons={disabledButtons}
                    purchasable={this.state.purchasable}
                    ordering={this.modalHandler}
                    price={this.state.totalPrice}
                />
            </>
        );
    }
}

export default BurgerBuilder;