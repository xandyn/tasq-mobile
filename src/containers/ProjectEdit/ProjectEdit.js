import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
  static navigatorStyle = {};

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
    if (event.id === 'saveProject') {
      projectEditRequest(id, { name });
    }
  };

  onChangeProjectName = (value) => {
    const name = value.trim();
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
        <Text style={styles.label}>PROJECT MEMBERS</Text>
      </View>
    );
  }
}
