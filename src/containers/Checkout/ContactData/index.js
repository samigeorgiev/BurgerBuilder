import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';

import axios from 'axiosBurger';

import { orderForm } from './orderForm';

import styles from './index.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            ...orderForm
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let elIdentifier in this.state.orderForm) {
            formData[elIdentifier] = this.state.orderForm[elIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
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
        console.log(updatedElement);
        let formIsValid = true;
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
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        console.log(formElements);
        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElements.map(el => (
                        <Input
                            key={el.id}
                            name={el.id}
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
        ingredients: state.ingredients,
        price: state.price
    };
};

export default connect(mapStateToProps)(withRouter(ContactData));