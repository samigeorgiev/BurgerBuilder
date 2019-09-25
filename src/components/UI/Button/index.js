import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const button = props => (
    <button
        disabled={props.disabled}
        onClick={props.click}
        className={[styles.Button, styles[props.type]].join(' ')}
    >
        {props.children}
    </button>
);

button.propTypes = {
    click: PropTypes.func,
    type: PropTypes.oneOf(['Success', 'Danger']) 
};

export default button;