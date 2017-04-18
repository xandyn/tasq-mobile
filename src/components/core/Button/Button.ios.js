import React from 'react';
import { TouchableOpacity } from 'react-native';


const Button = ({ children, ...props }) => (
  <TouchableOpacity {...props}>
    {children}
  </TouchableOpacity>
);


export default Button;
