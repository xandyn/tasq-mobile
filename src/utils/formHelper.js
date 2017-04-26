import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors';
import BaseStyles from '../styles/Base';


const styles = StyleSheet.create({
  error: {
    ...BaseStyles.label,
    color: Colors.red,
  },
  label: {
    ...BaseStyles.label,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});


/* eslint-disable react/prop-types, import/prefer-default-export */
export const renderField = ({
  input: { value, onChange },
  meta: { touched, error },
  placeholder, icon, label,
  ...rest
}) => (
  <View>
    <Text style={(touched && error) ? styles.error : styles.label}>
      {(touched && error) ? error.toUpperCase() : label.toUpperCase()}
    </Text>
    <View style={styles.formGroup}>
      {icon && <Icon name={icon} size={30} />}
      <TextInput
        value={value}
        onChangeText={v => onChange(v)}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  </View>
);
/* eslint-enable react/prop-types, import/prefer-default-export */
