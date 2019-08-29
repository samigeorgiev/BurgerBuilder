import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredient from './BurgerIngredient';

import styles from './index.module.css';

const burger = props => {
    const ingredientElements = Object.keys(props.ingredients).map(ingr => (
        [...Array(props.ingredients[ingr])].map((_, index) => (
            <BurgerIngredient key={ingr + index} type={ingr} />
        ))
    )).reduce((arr, el) => (
        arr.concat(el)
    ), []);
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientElements.length
                ? ingredientElements
                : <p>Start adding ingredients</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.number)
};

export default burger;