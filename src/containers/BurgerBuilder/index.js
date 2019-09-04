import React, { Component } from 'react';

import withErrorHandler from 'hoc/withErrorHandler';
import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';
import Modal from 'components/UI/Modal';
import OrderSummary from 'components/Burger/OrderSummary';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosBurger';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        purchasable: false,
        totalPrice: 4,
        showModal: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(err => {
                this.setState({error: true});
            });
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

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            let key = encodeURIComponent(i);
            let value = encodeURIComponent(this.state.ingredients[i]);
            queryParams.push(key + '=' + value);
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Samuil Georgiev',
        //         city: 'Sofia',
        //         phone: '0877777777'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({
        //             loading: false,
        //             showModal: false
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             loading: false,
        //             showModal: false
        //         });
        //     });
    }

    render() {

        let burger = <Spinner />;
        let modalContent = null;
        let disabledButtons = null;

        if (this.state.ingredients) {
            disabledButtons = {
                ...this.state.ingredients
            };
            // eslint-disable-next-line
            for (let key in disabledButtons) {
                disabledButtons[key] = disabledButtons[key] === 0;
            }

            burger = (
                <>
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
    
            if (this.state.loading) {
                modalContent = <Spinner />;
            } else {
                modalContent = (
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.modalHandler}
                        continue={this.purchaseContinueHandler}
                    />
                );
            }
        }

        return (
            !this.state.error
                ? <>
                    <Modal show={this.state.showModal} close={this.modalHandler}>
                        {modalContent}
                    </Modal>
                    {burger}
                </>
                : <h1>Ingredients can't be loaded!</h1>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);