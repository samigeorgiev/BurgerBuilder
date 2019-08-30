import React from 'react';

import Toolbar from 'components/Navigation/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer';

import styles from './index.module.css';

const layout = props => (
    <>
        <Toolbar />
        <SideDrawer />
        <main className={styles.Content}>
            {props.children}
        </main>
    </>
);

export default layout;