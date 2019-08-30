import React from 'react';

import Toolbar from 'components/Navigation/Toolbar';

import styles from './index.module.css';

const layout = props => (
    <>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </>
);

export default layout;