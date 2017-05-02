import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../components/core/Button/Button';

import styles from './CreateProjectModalStyles';


class CreateProjectModal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    projectCreateRequest: PropTypes.func.isRequired,
  };

  state = {
    name: '',
  };

  saveProject = () => {
    const { name } = this.state;
    const { projectCreateRequest, toggleModal } = this.props;
    if (name.trim()) {
      projectCreateRequest({ name });
      toggleModal();
    }
  };

  render() {
    const { name } = this.state;
    const { toggleModal } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          value={name}
          onChangeText={v => this.setState({ name: v })}
          placeholder="Project name"
          underlineColorAndroid="transparent"
        />
        <View style={styles.footer}>
          <Button onPress={toggleModal}>
            <View style={styles.cancelBtn}>
              <Text style={styles.cancelText}>CLOSE</Text>
            </View>
          </Button>
          <Button onPress={this.saveProject}>
            <View style={styles.saveBtn}>
              <Text style={styles.saveText}>SAVE</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}


export default CreateProjectModal;
