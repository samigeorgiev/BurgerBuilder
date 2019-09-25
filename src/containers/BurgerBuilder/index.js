import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from 'hoc/withErrorHandler';
import Burger from 'components/Burger';
import BuildControls from 'components/Burger/BuildControls';
import Modal from 'components/UI/Modal';
import OrderSummary from 'components/Burger/OrderSummary';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosBurger';
import * as actions from 'store/actions';

class BurgerBuilder extends Component {

    state = {
        showModal: false
    }

    componentDidMount() {
        this.props.onFetchIngredients();
    }


    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients).map(key => (
            ingredients[key]
        )).reduce((sum, el) => (
            sum + el
        ), 0);
        return sum > 0;
    }

    orderHandler = () => {
        if (this.props.isAuth) {
            this.setState(prevState => {
                return { showModal: !prevState.showModal };
            });
        } else {
            this.props.onAuthSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseContinueHandler = () => {
        this.props.onInitOrder();
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
            // eslint-disable-next-line
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
                        purchasable={
                            this.isPurchasable(this.props.ingredients)
                        }
                        ordering={this.orderHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuth}
                    />
                </>
            );

            modalContent = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    cancel={this.orderHandler}
                    continue={this.purchaseContinueHandler}
                />
            );

        }

        return (
            !this.props.error
                ? <>
                    <Modal
                        show={this.state.showModal}
                        close={this.orderHandler}
                    >
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
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: ingredient => (
            dispatch(actions.addIngredient(ingredient))
        ),
        onIngredientRemove: ingredient => (
            dispatch(actions.removeIngredient(ingredient))
        ),
        onFetchIngredients: () => dispatch(actions.fetchIngredients()),
        onInitOrder: () => dispatch(actions.initOrder()),
        onAuthSetRedirectPath: path => dispatch(actions.authSetRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios)
);