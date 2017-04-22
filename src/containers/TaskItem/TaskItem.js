import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import InteractableRow from '../../components/InteractableRow/InteractableRow';

import { getTasksMap } from '../../selectors/tasks';
import { getUserById } from '../../selectors/users';

import styles from './TaskItemStyles';


@connect(
  (_, { id, project }) => ({ projects, tasks, users }) => {
    const task = getTasksMap({ tasks }).get(id);
    const assignedToUserId = task.get('assigned_to_user');
    return {
      project: project || projects.byId.get(task.get('project').toString()),
      item: task,
      assignedToUser: assignedToUserId ? getUserById({ users, userId: assignedToUserId }) : null,
    };
  },
)
export default class TaskItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onClickTask = () => {
    const { id, navigator } = this.props;
    navigator.push({
      screen: 'tasq.TaskEdit',
      passProps: { id },
      backButtonTitle: '',
    });
  };

  onButtonPress = name => () => {
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
      <InteractableRow style={styles.container} onButtonPress={this.onButtonPress}>
        <TouchableWithoutFeedback onPress={this.onClickTask}>
          <View style={styles.taskContent}>
            <View>
              <Text
                style={isCompleted ? styles.taskTextCompleted : styles.taskText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.get('text')}
              </Text>
              {completionDate &&
                <Text style={overdue ? styles.taskOverdue : styles.taskDue}>
                  {moment(completionDate).calendar(null, calendarFormats)}
                  {!moment().isSame(completionDate, 'year') && moment(completionDate).format(' YYYY')}
                </Text>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </InteractableRow>
    );
  }
}
