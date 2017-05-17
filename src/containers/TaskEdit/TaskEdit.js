import React from 'react';
import { View, ScrollView, Text, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Button from '../../components/core/Button/Button';
import UserPicker from '../../components/UserPicker/UserPicker';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import { getProjectsMap } from '../../selectors/projects';
import { getTasksMap } from '../../selectors/tasks';
import NavigationActions from '../../navigation';

import { getUserById, getUsersByIds } from '../../selectors/users';
import * as tasksActions from '../../actions/tasks';

import styles from './TaskEditStyles';
import Colors from '../../styles/Colors';


@connect(
  (_, { id }) => ({ projects, tasks, users }) => {
    const task = getTasksMap({ tasks }).get(id);
    const project = getProjectsMap({ projects }).get(task.get('project').toString());
    const assignedToUserId = task.get('assigned_to_user');
    const ownerId = project.get('owner');
    const collaboratorsIds = project.get('collaborators');
    return {
      item: task,
      owner: getUserById({ users, userId: ownerId }),
      collaborators: getUsersByIds({ users, usersIds: collaboratorsIds }),
      assignedToUser: assignedToUserId ?
        getUserById({ users, userId: assignedToUserId }) : undefined,
    };
  },
  dispatch => bindActionCreators({
    ...tasksActions,
  }, dispatch)
)
export default class TaskEdit extends React.Component {
  static defaultProps = {
    assignedToUser: undefined,
  };

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    owner: ImmutablePropTypes.map.isRequired,
    collaborators: ImmutablePropTypes.list.isRequired,
    assignedToUser: ImmutablePropTypes.map,
    id: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    taskEditRequest: PropTypes.func.isRequired,
    taskDeleteRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { item, assignedToUser, navigator } = props;

    const text = item.get('text');
    const note = item.get('note') || '';
    const user = assignedToUser;
    const completed = item.get('is_completed');
    const completionDate = item.get('completion_date')
      ? moment(item.get('completion_date')).toDate() : undefined;
    const notificationDate = item.get('notification_date')
      ? moment(item.get('notification_date')).toDate() : undefined;

    this.state = {
      text,
      note,
      user,
      completed,
      completionDate,
      notificationDate
    };

    NavigationActions.setNavigator(navigator);
    navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'saveTask':
        this.saveTask();
        break;
      default:
        break;
    }
  };

  onDelete = () => {
    const onPress = () => {
      const { id, taskDeleteRequest } = this.props;
      taskDeleteRequest(id, true);
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

  saveTask = () => {
    const { text, note, user, completionDate, notificationDate } = this.state;
    const { id, taskEditRequest } = this.props;
    taskEditRequest(id, true, {
      text,
      note,
      assigned_to_user_id: user ? user.get('id') : null,
      completion_date: completionDate ? moment(completionDate).format() : null,
      notification_date: notificationDate ? moment(notificationDate).format() : null,
    });
  };

  render() {
    const { text, note, user, completionDate, notificationDate } = this.state;
    const { owner, collaborators } = this.props;
    const items = collaborators.unshift(owner);
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
          value={text}
          name="text"
          onChangeText={v => this.setState({ text: v })}
          placeholder="Project name"
          underlineColorAndroid="transparent"
        />
        <UserPicker
          user={user}
          items={items}
          onSelect={v => this.setState({ user: v })}
        />
        <DateTimePicker
          date={completionDate}
          handleDatePicker={v => this.setState({ completionDate: v })}
          placeholder="Set date of completion"
        />
        <DateTimePicker
          date={notificationDate}
          handleDatePicker={v => this.setState({ notificationDate: v })}
          placeholder="Remind me"
        />
        <View style={styles.note}>
          <TextInput
            multiline
            autoCapitalize="none"
            style={styles.textArea}
            placeholderTextColor={Colors.textSecondary}
            value={note}
            name="note"
            onChangeText={v => this.setState({ note: v })}
            placeholder="Add note"
            underlineColorAndroid="transparent"
          />
        </View>
        <Button onPress={this.onDelete}>
          <View style={styles.delete} elevation={1}>
            <Text style={styles.deleteText}>
              DELETE TASK
            </Text>
          </View>
        </Button>
      </ScrollView>
    );
  }
}
