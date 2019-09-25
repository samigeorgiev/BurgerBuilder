import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const backdrop = props => (
    props.show
        ? <div className={styles.Backdrop} onClick={props.click}></div>
        : null
);

backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    click: PropTypes.func
};

export default backdrop;