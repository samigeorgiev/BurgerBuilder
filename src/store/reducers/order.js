import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    ordered: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                ordered: false,
                error: false
            }
        case actionTypes.ORDER_BURGER_STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ORDER_BURGER_SUCCEDED:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return {
                ...state,
                loading: false,
                ordered: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.ORDER_BURGER_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.FETCH_ORDERS_STARTED:
            return {
                ...state,
                loading: true,
                error: false
            };
        case actionTypes.FETCH_ORDERS_SUCCEEDED:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;