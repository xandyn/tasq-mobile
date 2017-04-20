import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../../components/core/Button/Button';

import { getTasksMap } from '../../selectors/tasks';
import { getUserById } from '../../selectors/users';

import styles from './TaskItemStyles';


@connect(
  (_, { id, project }) => {
    return ({ projects, tasks, users }) => {
      const task = getTasksMap({ tasks }).get(id);
      const assignedToUserId = task.get('assigned_to_user');
      return {
        project: project || projects.byId.get(task.get('project').toString()),
        item: task,
        assignedToUser: assignedToUserId ? getUserById({ users, userId: assignedToUserId }) : null,
      };
    };
  },
)
export default class TaskItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    onClickTask: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onClickTask = (e) => {
    const { id, navigator } = this.props;
    navigator.push({
      screen: 'tasq.TaskEdit',
      passProps: { id },
      backButtonTitle: '',
    })
  };

  render() {
    const { item } = this.props;
    return (
      <Button onPress={this.onClickTask}>
        <View style={styles.container}>
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {item.get('text')}
          </Text>
        </View>
      </Button>
    );
  }
}
