import React from 'react';
import { ActivityIndicator } from 'react-native';

import styles from './SpinnerStyles';


const Spinner = props =>
  <ActivityIndicator
    size="large"
    color="white"
    style={styles.container}
    {...props}
  />;


export default Spinner;
