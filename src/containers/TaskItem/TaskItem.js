import React from 'react';
import { View, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import TaskIR from '../../components/InteractableRow/TaskIR/TaskIR';

import { getProjectsMap } from '../../selectors/projects';
import { getTasksMap } from '../../selectors/tasks';
import { getUserById } from '../../selectors/users';
import * as tasksActions from '../../actions/tasks';

import styles from './TaskItemStyles';
import Colors from '../../styles/Colors';


@connect(
  (_, { id, project }) => ({ projects, tasks, users }) => {
    const task = getTasksMap({ tasks }).get(id);
    const assignedToUserId = task.get('assigned_to_user');
    return {
      project: project || getProjectsMap({ projects }).get(task.get('project').toString()),
      item: task,
      assignedToUser: assignedToUserId ? getUserById({ users, userId: assignedToUserId }) : null,
    };
  },
  dispatch => bindActionCreators({
    ...tasksActions,
  }, dispatch)
)
export default class TaskItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    taskEditRequest: PropTypes.func.isRequired,
    taskDeleteRequest: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onClickTask = () => {
    const { id, navigator } = this.props;
    navigator.push({
      screen: 'tasq.TaskEditScreen',
      title: 'Edit task',
      passProps: { id },
      backButtonTitle: '',
    });
  };

  onButtonPress = name => () => {
    switch (name) {
      case 'done':
        this.onToggleComplete();
        break;
      case 'delete':
        this.onDelete();
        break;
      default:
        break;
    }
  };

  onToggleComplete = () => {
    const { id, item, taskEditRequest } = this.props;
    taskEditRequest(id, false, { is_completed: !item.get('is_completed') });
  };

  onDelete = () => {
    const onPress = () => {
      const { id, taskDeleteRequest } = this.props;
      taskDeleteRequest(id);
    };
    Alert.alert(
      'Delete this task?',
      '',
      [{
        text: 'Cancel', style: 'cancel'
      }, {
        text: 'Delete', onPress, style: 'destructive'
      }],
    );
  };

  render() {
    const { item } = this.props;

    const isCompleted = item.get('is_completed');
    const completionDate = item.get('completion_date');
    const overdue = moment().isAfter(completionDate);
    const calendarFormats = {
      sameDay: '[Today at] HH:mm',
      nextDay: '[Tomorrow at] HH:mm',
      lastDay: '[Yesterday at] HH:mm',
      nextWeek: 'ddd, D MMM',
      lastWeek: 'ddd, D MMM',
      sameElse: 'ddd, D MMM'
    };
    return (
      <TaskIR style={styles.container} onButtonPress={this.onButtonPress}>
        <TouchableWithoutFeedback onPress={this.onClickTask}>
          <View style={styles.taskContent}>
            <View>
              <Text
                style={[styles.taskText, {
                  textDecorationLine: isCompleted ? 'line-through' : 'none'
                }]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.get('text')}
              </Text>
              {completionDate &&
                <Text
                  style={[styles.taskCompletion, {
                    color: overdue ? Colors.red : Colors.textSecondary
                  }]}
                >
                  {moment(completionDate).calendar(null, calendarFormats)}
                  {!moment().isSame(completionDate, 'year') && moment(completionDate).format(' YYYY')}
                </Text>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TaskIR>
    );
  }
}
