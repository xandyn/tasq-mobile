import React from 'react';
import { TouchableNativeFeedback } from 'react-native';


const Button = ({ children, ...props }) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {children}
  </TouchableNativeFeedback>
);


export default Button;
