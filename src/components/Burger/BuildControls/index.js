import React from 'react';

import BuildControl from './BuildControl';

import styles from './index.module.css';

const CONTROLS = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
];

const buildControls = props => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {CONTROLS.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                clickMore={() => props.addIngredient(control.type)}
                clickLess={() => props.removeIngredient(control.type)}
                disabled={props.disabledButtons[control.type]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordering}    
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;