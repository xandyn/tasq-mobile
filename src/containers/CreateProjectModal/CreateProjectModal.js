import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import FabModal from '../../components/FabModal/FabModal';
import Button from '../../components/core/Button/Button';

import styles from './CreateProjectModalStyles';


class CreateProjectModal extends React.Component {
  static propTypes = {};

  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { open } = this.state;
    return (
      <FabModal
        toggleModal={this.toggleModal}
        open={open}
      >
        <View style={styles.container}>
          <Text>test 123</Text>
          <Button onPress={this.toggleModal}>
            <View>
              <Text>Close</Text>
            </View>
          </Button>
        </View>
      </FabModal>
    );
  }
}


export default CreateProjectModal;
