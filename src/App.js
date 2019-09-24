import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from 'containers/Layout';
import BurgerBuilder from 'containers/BurgerBuilder';
import Checkout from 'containers/Checkout';
import Orders from 'containers/Orders';
import Auth from 'containers/Auth';
import Logout from 'containers/Auth/Logout';

import * as actions from 'store/actions';

class App extends Component {
    componentDidMount() {
        this.props.onTryLogIn();
    }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/auth" exact component={Auth} />
                        {this.props.isAuth
                            ? <Route path="/orders" exact component={Orders} />
                            : null}
                        {this.props.isAuth
                            ? <Route path="/checkout" component={Checkout} />
                            : null}
                        {this.props.isAuth
                            ? <Route path="/logout" exact component={Logout} />
                            : null}
                        <Redirect to='/' />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryLogIn: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);