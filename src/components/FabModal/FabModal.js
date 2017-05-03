import React from 'react';
import { View, Animated, Dimensions, StyleSheet, BackHandler } from 'react-native';
import PropTypes from 'prop-types';

import FabButton from '../../components/FabButton/FabButton';


const WindowHeight = Dimensions.get('window').height;
const AnimationDuration = 200;
const ButtonPosition = {
  bottom: 38,
  height: 48,
  right: 30,
  width: 48,
};
const AnimateDistance = (WindowHeight - ButtonPosition.bottom - ButtonPosition.height) * 1.1;


export default class FabModal extends React.Component {
  static defaultProps = {
    button: undefined,
    style: undefined,
  };

  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    button: PropTypes.node,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.openAnimation = new Animated.Value(props.open ? 1 : 0);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      Animated.timing(this.openAnimation, {
        toValue: this.props.open ? 1 : 0,
        duration: AnimationDuration,
      }).start();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress);
  }

  hardwareBackPress = () => {
    const { open, toggleModal } = this.props;
    if (open) {
      toggleModal();
      return true;
    }
    return false;
  };

  render() {
    const { open, children, toggleModal, button, style } = this.props;
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Animated.View
          style={[
            {
              backgroundColor: 'white',
              borderRadius: WindowHeight / 2,
              position: 'absolute',
              opacity: this.openAnimation.interpolate({
                inputRange: [0, 0.0001],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
              bottom: this.openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  ButtonPosition.bottom,
                  ButtonPosition.bottom - AnimateDistance,
                ],
              }),
              height: this.openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  ButtonPosition.height,
                  ButtonPosition.height + 2 * AnimateDistance,
                ],
              }),
              right: this.openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  ButtonPosition.right,
                  ButtonPosition.right - AnimateDistance,
                ],
              }),
              width: this.openAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  ButtonPosition.width,
                  ButtonPosition.width + 2 * AnimateDistance,
                ],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              opacity: this.openAnimation.interpolate({
                inputRange: [0.6, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
            style
          ]}
          pointerEvents={open ? 'auto' : 'none'}
        >
          {open && children}
        </Animated.View>
        <FabButton onPress={toggleModal} close={open}>
          {button}
        </FabButton>
      </View>
    );
  }
}
