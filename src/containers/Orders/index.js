import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from 'components/Order';
import Spinner from 'components/UI/Spinner';
import withErrorHandler from 'hoc/withErrorHandler';

import axios from 'axiosBurger';
import * as actions from 'store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ));

        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fecthOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(Orders, axios)
);