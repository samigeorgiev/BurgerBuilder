import React from 'react';

import Button from 'components/UI/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => (
        <li key={ingredient}>
            <span style={{textTransform: "capitalize"}}>
                {ingredient}
            </span>
            {": " + props.ingredients[ingredient]}
        </li>
    ));

    return (
        <>
            <h3>Your order</h3>
            <p>Burger Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" click={props.cancel}>CANCEL</Button>
            <Button type="Success" click={props.continue}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;