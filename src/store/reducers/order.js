import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    ordered: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_INIT: return orderInit(state, action);
        case actionTypes.ORDER_BURGER_STARTED:
            return orderBurgerStarted(state, action);
        case actionTypes.ORDER_BURGER_SUCCEDED:
            return orderBurgerSucceeded(state, action);
        case actionTypes.ORDER_BURGER_FAILED:
            return orderBurgerFailed(state, action);
        case actionTypes.FETCH_ORDERS_STARTED:
            return fetchOrdersStarted(state, action);
        case actionTypes.FETCH_ORDERS_SUCCEEDED:
            return fetchOrdersSucceeded(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default: return state;
    }
};

const orderInit = (state, action) => {
    return {
        ...state,
        ordered: false,
        error: false
    };
};

const orderBurgerStarted = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const orderBurgerSucceeded = (state, action) => {
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
};

const orderBurgerFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const fetchOrdersStarted = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false
    };
};

const fetchOrdersSucceeded = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
};

const fetchOrdersFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
};

export default reducer;