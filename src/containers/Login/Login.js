import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
} from 'revalidate';

import * as authActions from '../../actions/auth';

import { isValidEmail, hasLengthGreaterOrEqual } from '../../utils/customValidators';
import { renderField } from '../../utils/formHelper';

import styles from './LoginStyles';


const validate = combineValidators({
  email: composeValidators(
    isRequired,
    isValidEmail
  )('Email'),
  password: composeValidators(
    isRequired,
    hasLengthGreaterOrEqual(6)
  )('Password')
});


@connect(null, dispatch => bindActionCreators(authActions, dispatch))
@reduxForm({ form: 'LoginForm', fields: ['email', 'password'], validate })
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    loginRequest: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => {
    this.props.loginRequest(values);
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <View style={styles.container}>
        <Field
          autoCorrect={false}
          autoCapitalize={false}
          name="email"
          keyboardType="email-address"
          component={renderField}
          placeholder="email@example.com"
          label="email address"
        />
        <Field
          secureTextEntry
          name="password"
          component={renderField}
          placeholder="Password"
          label="password"
        />
        <TouchableOpacity onPress={handleSubmit(this.handleSubmit)}>
          <View>
            <Text>login</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
