import React from 'react';

import styles from './index.module.css';

const order = props => {
    const ingredients = [];
    for (let ingr in props.ingredients) {
        ingredients.push({name: ingr, amount: props.ingredients[ingr]});
    }
    const ingredientElements =  ingredients.map(ingr => (
        <span
            key={ingr.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >
            {ingr.name}({ingr.amount})
        </span>
    ));
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientElements}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;