import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './InteractableRowStyles';


export default class InteractableRow extends React.Component {
  static defaultProps = {
    damping: 1-0.7,
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

    this._deltaX = new Animated.Value(0);
  }

  render() {
    const { damping, tension, onButtonPress, children, ...props } = this.props;
    return (
      <View {...props}>
        <View style={styles.mainHolder} pointerEvents='box-none'>
          <Animated.View style={
            [styles.trashHolder, {
              transform: [{
                translateX: this._deltaX.interpolate({
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

        <View style={styles.mainHolder} pointerEvents='box-none'>
          <Animated.View style={
            [styles.doneHolder, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [0, 75],
                  outputRange: [-75, 0]
                })
              }]
            }]}
          >
            <TouchableOpacity onPress={onButtonPress('done')}>
              <Icon name="ios-checkmark" size={50} style={styles.button} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 75,  damping: 1-damping, tension},
            {x: 0,   damping: 1-damping, tension},
            {x: -75, damping: 1-damping, tension}
          ]}
          animatedValueX={this._deltaX}
        >
          {children}
        </Interactable.View>
      </View>
    );
  }
}
