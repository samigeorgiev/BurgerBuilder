import React, { Component } from 'react';

import withErrorHandler from 'hoc/withErrorHandler';
import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';
import Modal from 'components/UI/Modal';
import OrderSummary from 'components/Burger/OrderSummary';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosOrders';

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
        showModal: false,
        loading: false
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

    purchaseContinue = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Samuil Georgiev',
                city: 'Sofia',
                phone: '0877777777'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({
                    loading: false,
                    showModal: false
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    showModal: false
                });
            });
    }

    render() {
        const disabledButtons = {
            ...this.state.ingredients
        };
        // eslint-disable-next-line
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] === 0;
        }

        let modalContent = null;
        if (this.state.loading) {
            modalContent = <Spinner />;
        } else {
            modalContent = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.modalHandler}
                    continue={this.purchaseContinue}
                />
            );
        }

        return (
            <>
                <Modal show={this.state.showModal} close={this.modalHandler}>
                    {modalContent}
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

export default withErrorHandler(BurgerBuilder, axios);