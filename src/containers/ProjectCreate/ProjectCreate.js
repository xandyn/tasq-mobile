import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationActions from '../../navigation';

import * as projectsActions from '../../actions/projects';

import styles from './ProjectCreateStyles';


@connect(
  ({ projects }) => ({
    isCreating: projects.meta.get('creating'),
  }),
  dispatch => bindActionCreators({
    ...projectsActions,
  }, dispatch)
)
class CreateProject extends React.Component {
  static propTypes = {
    isCreating: PropTypes.bool.isRequired,
    projectCreateRequest: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    NavigationActions.setNavigator(props.navigator);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'saveProject':
        this.saveProject();
        break;
      case 'back':
        this.props.navigator.dismissModal();
        break;
      default:
        break;
    }
  };

  saveProject = () => {
    const { name } = this.state;
    const { projectCreateRequest } = this.props;
    if (name.trim()) {
      projectCreateRequest({ name });
    }
  };

  render() {
    const { name } = this.state;
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
      </View>
    );
  }
}


export default CreateProject;
