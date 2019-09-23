import * as actionTypes from './actionTypes';

import axios from 'axiosBurger';

export const addIngredient = ingredient => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    };
};

export const removeIngredient = ingredient => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient
    };
};

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(setIngredientsFailed());
            });
    };
};

const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    };
};