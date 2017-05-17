import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './EmptyStyles';


const Empty = ({ text, ...props }) =>
  <View style={styles.container} {...props}>
    <Text style={styles.text}>{text}</Text>
  </View>;


Empty.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Empty;
