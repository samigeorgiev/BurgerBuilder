import React from 'react';

import styles from './index.module.css';

const input = props => {
    let inputElement = null;
    let validationError = null;
    const classes = [styles.InputElement];

    if (!props.isValid && props.isTouched) {
        validationError = (
            <p className={styles.ValidationError}>
                Please enter a valid {props.name}
            </p>
        );
        classes.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input
                    className={classes.join(' ')}
                    value={props.value}
                    onChange={props.change}
                    {...props.elementConfig}
                />
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea
                    className={classes.join(' ')}
                    value={props.value}
                    onChange={props.change}
                    {...props.elementConfig}
                />
            );
            break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.join(' ')}
                    value={props.value}
                    onChange={props.change}
                >
                    {props.elementConfig.options.map(op => (
                        <option value={op.value} key={op.value}>
                            {op.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={classes.join(' ')}
                    value={props.value}
                    onChange={props.change}
                    {...props.elementConfig}
                />
            );
    };
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
