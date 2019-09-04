import React, { Component } from 'react';

import CheckoutSummary from 'components/Order/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1.,
            cheese: 1
        }
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
            </div>
        );
    }
}

export default Checkout;