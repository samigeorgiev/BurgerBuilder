import React from 'react';

import Burger from 'components/Burger';
import Button from 'components/UI/Button';

import styles from './index.module.css';

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="Danger" click={props.cancel}>CANCEL</Button>
            <Button type="Success" click={props.continue}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;