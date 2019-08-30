import React from 'react';

import Button from 'components/UI/Button';

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
            <p>Continue to Checkout?</p>
            <Button type="Danger" click={props.cancel}>CANCEL</Button>
            <Button type="Success" click={props.continue}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;