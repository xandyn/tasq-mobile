import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './AvatarStyles';


class Avatar extends React.Component {
  static defaultProps = {
    style: undefined,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.any.isRequired,
    style: PropTypes.any,
  };

  getInitials = (name) => {
    const firstName = name.toUpperCase().split(' ')[0];
    const lastName = name.toUpperCase().split(' ')[1];
    return lastName ?
      `${firstName.charAt(0)}${lastName.charAt(0)}` :
      `${firstName.charAt(0)}`;
  };

  render() {
    const { user: { avatar, name, email }, style, size, ...props } = this.props;

    if (avatar) {
      return (
        <View style={[{ backgroundColor: 'transparent' }, style]} {...props}>
          <Image
            style={[styles.icon, {
              borderRadius: size / 2,
              height: size,
              width: size,
            }]}
            source={{ uri: avatar.url }}
          />
        </View>
      );
    }

    const colors = [
      '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085',
      '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22',
      '#e74c3c', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7',
    ];
    const initials = this.getInitials(name || email);
    const charIndex = initials.charCodeAt(0) - 65;
    const color = colors[charIndex % colors.length];

    return (
      <View style={[{ backgroundColor: 'transparent' }, style]} {...props}>
        <View
          style={[styles.icon, {
            borderRadius: size / 2,
            backgroundColor: color,
            height: size,
            width: size,
          }]}
        >
          <Text
            allowFontScaling={false}
            style={[styles.text, { fontSize: (size - 5) / 2 }]}
          >
            {initials}
          </Text>
        </View>
      </View>
    );
  }
}


export default Avatar;
