import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideDrawer from 'components/Navigation/SideDrawer';
import Toolbar from 'components/Navigation/Toolbar';

import styles from './index.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer });
    }

    render() {
        return (
            <>
                <Toolbar
                    drawerToggleClick={this.sideDrawerHandler}
                    isAuth={this.props.isAuth}
                />
                <SideDrawer
                    close={this.sideDrawerHandler}
                    show={this.state.showSideDrawer}
                    isAuth={this.props.isAuth}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);