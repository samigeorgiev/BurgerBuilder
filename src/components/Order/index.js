import React from 'react';

import styles from './index.module.css';

const order = props => {
    const ingredients = [];
    // eslint-disable-next-line
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientElements =  ingredients.map(ingredient => (
        <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >
            {ingredient.name}({ingredient.amount})
        </span>
    ));

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientElements}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;