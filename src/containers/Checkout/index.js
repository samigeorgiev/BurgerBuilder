import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from 'components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let content = <Redirect to='/' />;
        const purchasedRedirect = this.props.ordered
            ? <Redirect to='/' />
            : null;
        if (this.props.ingredients) {
            content = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancel={this.checkoutCancelHandler}
                        continue={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return content;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        ordered: state.order.ordered
    };
};

export default connect(mapStateToProps)(Checkout);