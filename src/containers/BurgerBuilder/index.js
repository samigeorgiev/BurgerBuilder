import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from 'hoc/withErrorHandler';
import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';
import Modal from 'components/UI/Modal';
import OrderSummary from 'components/Burger/OrderSummary';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosBurger';
import * as actionTypes from 'store/actionTypes';

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        showModal: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     })
        //     .catch(err => {
        //         this.setState({error: true});
        //     });
    }
    

    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients).map(key => (
            ingredients[key]
        )).reduce((sum, el) => (
            sum + el
        ), 0);
        return sum > 0;
    }

    modalHandler = () => {
        this.setState({showModal: !this.state.showModal});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        let burger = <Spinner />;
        let modalContent = null;
        let disabledButtons = null;

        if (this.props.ingredients) {
            disabledButtons = {
                ...this.props.ingredients
            };
            for (let key in disabledButtons) {
                disabledButtons[key] = disabledButtons[key] === 0;
            }

            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemove}
                        disabledButtons={disabledButtons}
                        purchasable={this.isPurchasable(this.props.ingredients)}
                        ordering={this.modalHandler}
                        price={this.props.price}
                    />
                </>
            );
    
            if (this.state.loading) {
                modalContent = <Spinner />;
            } else {
                modalContent = (
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: ingredient => (
            dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient})
        ),
        onIngredientRemove: ingredient => (
            dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));