import React from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  input: {
    fontFamily: 'Lato',
    height: 40,
    width: width * 0.7,
    marginLeft: 10
  },
  error: {
    fontFamily: 'Lato',
    color: 'red'
  },
  label: {
    fontFamily: 'Lato',
    color: 'black'
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
      {(touched && error) ? error : label}
    </Text>
    <View style={styles.formGroup}>
      {icon && <Icon name={icon} size={30} />}
      <TextInput
        value={value}
        onChangeText={e => onChange(e)}
        style={styles.input}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  </View>
);
/* eslint-enable react/prop-types, import/prefer-default-export */
