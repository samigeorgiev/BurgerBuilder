import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';

import { authForm } from './authForm';

import * as actions from 'store/actions';

import styles from './index.module.css';

class Auth extends Component {
    state = {
        authForm: authForm,
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.isBuilding) {
            this.props.onAuthSetRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        let trimmedValue = value.trim();

        if (rules.required) {
            isValid = trimmedValue !== '' && isValid;
        }

        return isValid;
    }

    inputHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [inputIdentifier]: {
                ...this.state.authForm[inputIdentifier],
                value: event.target.value,
                isValid: this.checkValidity(
                    event.target.value,
                    this.state.authForm[inputIdentifier].validation
                ),
                isTouched: true
            }
        };
        this.setState({ authForm: updatedAuthForm });
    }

    authHandler = event => {
        event.preventDefault();
        this.props.onAuth(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignup
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        const formElements = [];
        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let form = <Spinner />;
        if (!this.props.loading) {
            form = formElements.map(el => (
                <Input
                    key={el.id}
                    valueType={el.id}
                    change={(event) => this.inputHandler(event, el.id)}
                    {...el.config}
                />
            ));
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let redirect = null;
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={styles.Auth}>
                <p>{this.state.isSignup ? "SIGN UP" : "SIGN IN"}</p>
                {redirect}
                {errorMessage}
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button type="Success">SUBMIT</Button>
                </form>
                <Button type="Danger" click={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        isBuilding: state.burgerBuilder.isBuilding,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => (
            dispatch(actions.auth(email, password, isSignup))
        ),
        onAuthSetRedirectPath: () => (
            dispatch(actions.authSetRedirectPath('/'))
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
