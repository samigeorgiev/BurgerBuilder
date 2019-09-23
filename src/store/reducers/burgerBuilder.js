import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_INGREDIENTS_FAILED:
            return setIngredientsFailed(state, action);
        default: return state;
    }
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        price: state.price + INGREDIENT_PRICES[action.ingredient]
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        price: state.price - INGREDIENT_PRICES[action.ingredient]
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        price: 4,
        error: false
    };
};

const setIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

export default reducer;