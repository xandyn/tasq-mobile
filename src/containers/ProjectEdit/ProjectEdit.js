import React from 'react';
import { View, ScrollView, Text, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Collaborators from '../Collaborators/Collaborators';
import ProjectSettings from '../ProjectSettings/ProjectSettings';
import Button from '../../components/core/Button/Button';

import { getProjectsMap } from '../../selectors/projects';
import { iconsMap } from '../../utils/AppIcons';
import NavigationActions from '../../navigation';

import * as projectsActions from '../../actions/projects';

import styles from './ProjectEditStyles';


@connect(
  (_, { id }) => ({ projects, profile }) => ({
    profile: profile.data,
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
    profile: ImmutablePropTypes.map.isRequired,
    id: PropTypes.string.isRequired,
    projectEditRequest: PropTypes.func.isRequired,
    projectDeleteRequest: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    NavigationActions.setNavigator(props.navigator);

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
    const onPress = () => {
      const { id, projectDeleteRequest } = this.props;
      projectDeleteRequest(id);
    };
    Alert.alert(
      'Delete this project?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress, style: 'destructive' },
      ],
    );
  };

  render() {
    const { name } = this.state;
    const { item, profile } = this.props;
    const ownerIsCurrentUser = profile.get('email') === item.get('owner');
    const isShared = item.get('is_shared');
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer} elevation={1}>
          <Icon style={styles.icon} name={isShared ? 'people' : 'list'} size={20} />
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            value={name}
            onChangeText={this.onChangeProjectName}
            placeholder="Project name"
            underlineColorAndroid="transparent"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>COLLABORATORS</Text>
          <Collaborators
            project={item}
            ownerIsCurrentUser={ownerIsCurrentUser}
          />
          <Text style={styles.label}>SETTINGS</Text>
          <ProjectSettings />
          {ownerIsCurrentUser &&
            <Button onPress={this.onDelete}>
              <View style={styles.delete} elevation={1}>
                <Text style={styles.deleteText}>
                  DELETE PROJECT
                </Text>
              </View>
            </Button>
          }
        </ScrollView>
      </View>
    );
  }
}
