import React, { Component } from 'react';

import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';

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
        totalPrice: 4
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
    }

    render() {
        const disabledButtons = {
            ...this.state.ingredients
        };
        for (let ingr in disabledButtons) {
            disabledButtons[ingr] = disabledButtons[ingr] === 0;
        }
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButtons={disabledButtons}
                    price={this.state.totalPrice}
                />
            </>
        );
    }
}

export default BurgerBuilder;