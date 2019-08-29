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
        {CONTROLS.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                clickMore={() => props.addIngredient(control.type)}
                clickLess={() => props.removeIngredient(control.type)}
            />
        ))}
    </div>
);

export default buildControls;