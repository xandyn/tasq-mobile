import React from 'react';
import PropTypes from 'prop-types';
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


Button.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Button;
