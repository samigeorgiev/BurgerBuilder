import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';
import withErrorHandler from 'hoc/withErrorHandler';

import axios from 'axiosBurger';
import * as actions from 'store/actions';

import { orderForm } from './orderForm';

import styles from './index.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            ...orderForm
        },
        formIsValid: false
    }

    orderHandler = event => {
        event.preventDefault();
        const formData = {};
        // eslint-disable-next-line
        for (let elementKey in this.state.orderForm) {
            formData[elementKey] = this.state.orderForm[elementKey].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedElement.value = event.target.value;
        updatedElement.isValid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.isTouched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;
        let formIsValid = true;
        // eslint-disable-next-line
        for (let inputElement in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElement].isValid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;
        let trimmedValue = value.trim();

        if (rules.required) {
            isValid = trimmedValue !== '' && isValid;
        }

        return isValid;
    }

    render() {
        const formElements = [];
        // eslint-disable-next-line
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = <Spinner />;
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElements.map(el => (
                        <Input
                            key={el.id}
                            valueType={el.id}
                            change={(event) => this.inputHandler(event, el.id)}
                            {...el.config}
                        />
                    ))}
                    <Button type="Success" disabled={!this.state.formIsValid} click={this.orderHandler}>
                        ORDER
                    </Button>
                </form>

            );
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => (
            dispatch(actions.orderBurger(orderData, token))
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(ContactData, axios)
);