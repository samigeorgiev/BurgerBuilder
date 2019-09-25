import * as actionTypes from './actionTypes';
import axios from 'axiosBurger';

export const orderBurger = (orderData, token) => {
    return dispatch => {
        dispatch(startOrder());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                dispatch(orderSucceeded(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(orderFailed(err));
            });
    };
};

export const initOrder = () => {
    return {
        type: actionTypes.INIT_ORDER
    };
};

export const fecthOrders = (token, userId) => {
    return dispatch => {
        dispatch(startFetchingOrders());
        const query = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/orders.json' + query)
            .then(res => {
                const orders = [];
                // eslint-disable-next-line
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

const startOrder = () => {
    return {
        type: actionTypes.START_ORDER
    }
};

const orderSucceeded = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCEEDED,
        id: id,
        orderData: orderData
    };
};

const orderFailed = error => {
    return {
        type: actionTypes.ORDER_FAILED
    };
};

const startFetchingOrders = () => {
    return {
        type: actionTypes.START_FETCHING_ORDERS
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