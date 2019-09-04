import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from 'components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: null
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.checkoutCancelHandler}
                    continue={this.checkoutContinueHandler}    
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;