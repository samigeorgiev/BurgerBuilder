import React from 'react';

import BuildControl from './BuildControl';

import styles from './index.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
];

const buildControls = props => (
    <div className={styles.BuildControls}>
        {controls.map(control => (
            <BuildControl key={control.label} label={control.label} />
        ))}
    </div>
);

export default buildControls;