import React from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Collaborators from '../Collaborators/Collaborators';
import ProjectSettings from '../ProjectSettings/ProjectSettings';

import { getProjectsMap } from '../../selectors/projects';
import { iconsMap } from '../../utils/AppIcons';

import * as projectsActions from '../../actions/projects';

import styles from './ProjectEditStyles';


@connect(
  (_, { id }) => ({ projects }) => ({
    item: getProjectsMap({ projects }).get(id),
  }),
  dispatch => bindActionCreators({
    ...projectsActions,
  }, dispatch)
)
export default class ProjectEdit extends React.Component {
  static navigatorStyle = {
    navBarTitleTextCentered: true,
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Save',
      id: 'saveProject',
      icon: iconsMap['ios-checkmark--big']
    }]
  };

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    id: PropTypes.string.isRequired,
    projectEditRequest: PropTypes.func.isRequired,
    projectDeleteRequest: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.get('name'),
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { name } = this.state;
    const { id, projectEditRequest } = this.props;
    switch (event.id) {
      case 'saveProject':
        if (name.trim()) projectEditRequest(id, { name });
        break;
      default:
        break;
    }
  };

  onChangeProjectName = (name) => {
    this.setState({ name });
  };

  onDelete = () => {
    const { id, projectDeleteRequest } = this.props;
    projectDeleteRequest(id);
  };

  render() {
    const { name } = this.state;
    const { item } = this.props;
    const isShared = item.get('is_shared');
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer} elevation={1}>
          <Icon style={styles.icon} name={isShared ? 'people' : 'list'} size={20} />
          <TextInput
            autoCapitalize={false}
            style={styles.input}
            value={name}
            onChangeText={this.onChangeProjectName}
            placeholder="Project name"
            underlineColorAndroid="transparent"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>COLLABORATORS</Text>
          <Collaborators project={item} />
          <Text style={styles.label}>SETTINGS</Text>
          <ProjectSettings />
        </ScrollView>
      </View>
    );
  }
}
