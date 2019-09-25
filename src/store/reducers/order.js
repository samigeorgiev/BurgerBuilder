import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    ordered: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_ORDER:
            return initOrder(state, action);
        case actionTypes.START_ORDER:
            return startOrder(state, action);
        case actionTypes.ORDER_SUCCEEDED:
            return orderSucceeded(state, action);
        case actionTypes.ORDER_FAILED:
            return orderFailed(state, action);
        case actionTypes.START_FETCHING_ORDERS:
            return startFetchingOrders(state, action);
        case actionTypes.FETCH_ORDERS_SUCCEEDED:
            return fetchOrdersSucceeded(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default:
            return state;
    }
};

const initOrder = (state, action) => {
    return {
        ...state,
        ordered: false,
        error: false
    };
};

const startOrder = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const orderSucceeded = (state, action) => {
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

const orderFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const startFetchingOrders = (state, action) => {
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