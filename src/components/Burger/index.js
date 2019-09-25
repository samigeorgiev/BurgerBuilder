import React from 'react';

import BurgerIngredient from './BurgerIngredient';

import styles from './index.module.css';

const burger = props => {
    const ingredientElements = Object.keys(props.ingredients).map(
        ingredient => (
            [...Array(props.ingredients[ingredient])].map((_, index) => (
                <BurgerIngredient key={ingredient + index} type={ingredient} />
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

export default burger;