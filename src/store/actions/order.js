import * as actionTypes from './actionTypes';
import axios from 'axiosBurger';

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerStarted());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                dispatch(orderBurgerSucceeded(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(orderBurgerFailed(err));
            });
    };
};

export const orderInit = () => {
    return {
        type: actionTypes.ORDER_INIT
    };
};

export const fecthOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStarted());
        const query = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/orders.json' + query)
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSucceeded(orders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err));
            });
    }
}

const orderBurgerStarted = () => {
    return {
        type: actionTypes.ORDER_BURGER_STARTED
    }
};

const orderBurgerSucceeded = (id, orderData) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCEDED,
        id: id,
        orderData: orderData
    };
};

const orderBurgerFailed = error => {
    return {
        type: actionTypes.ORDER_BURGER_FAILED
    };
};

const fetchOrdersStarted = () => {
    return {
        type: actionTypes.FETCH_ORDERS_STARTED
    };
};

const fetchOrdersSucceeded = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCEEDED,
        orders: orders
    };
};

const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: true
    };
};