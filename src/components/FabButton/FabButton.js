import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './FabButtonStyles';


class FabButton extends React.Component {
  static defaultProps = {
    children: undefined,
    close: false,
  };

  static propTypes = {
    children: PropTypes.node,
    close: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.animation = new Animated.Value(props.close ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.close !== this.props.close) {
      Animated.timing(this.animation, {
        toValue: nextProps.close ? 1 : 0,
        duration: 200,
      }).start();
    }
  }

  render() {
    const { children, onPress } = this.props;
    return (
      <Animated.View
        style={[styles.container, {
          transform: [{
            scale: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }]
        }]}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <View style={styles.button}>
            {!children ? <Icon size={35} name="ios-add" color="white" /> : children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}


export default FabButton;
