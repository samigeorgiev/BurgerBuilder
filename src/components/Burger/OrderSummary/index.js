import React from 'react';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingr => (
        <li key={ingr}>
            <span style={{textTransform: "capitalize"}}>{ingr}</span>: {props.ingredients[ingr]}
        </li>
    ));
    return (
        <>
            <h3>Your order</h3>
            <p>Burger Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </>
    );
};

export default orderSummary;