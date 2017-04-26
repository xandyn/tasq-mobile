import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CollaboratorIRStyles';


export default class InteractableRow extends React.Component {
  static defaultProps = {
    damping: 0.7,
    tension: 300,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    onButtonPress: PropTypes.func.isRequired,
    damping: PropTypes.number,
    tension: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
  }

  render() {
    const { damping, tension, onButtonPress, children, ...props } = this.props;
    return (
      <View {...props}>
        <View style={styles.mainHolder} pointerEvents="box-none">
          <Animated.View
            style={[styles.trashHolder, {
              transform: [{
                translateX: this.deltaX.interpolate({
                  inputRange: [-75, 0],
                  outputRange: [0, 75]
                })
              }]
            }]}
          >
            <TouchableOpacity onPress={onButtonPress('delete')} >
              <Icon name="ios-trash" size={30} style={styles.button} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.mainHolder} pointerEvents="box-none">
          <Animated.View
            style={[styles.flagHolder, {
              transform: [{
                translateX: this.deltaX.interpolate({
                  inputRange: [0, 75],
                  outputRange: [-75, 0]
                })
              }]
            }]}
          >
            <TouchableOpacity onPress={onButtonPress('promote')}>
              <Icon name="ios-flag" size={30} style={styles.button} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly
          snapPoints={[
            { x: 75, damping, tension },
            { x: 0, damping, tension },
            { x: -75, damping, tension }
          ]}
          animatedValueX={this.deltaX}
        >
          {children}
        </Interactable.View>
      </View>
    );
  }
}
