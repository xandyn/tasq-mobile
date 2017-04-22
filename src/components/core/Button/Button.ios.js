import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';


const Button = ({ children, ...props }) => (
  <TouchableOpacity {...props}>
    {children}
  </TouchableOpacity>
);


Button.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Button;
