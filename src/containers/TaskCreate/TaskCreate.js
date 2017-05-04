import React from 'react';
import { ScrollView, TextInput, Platform } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import UserPicker from '../../components/UserPicker/UserPicker';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import { iconsMap } from '../../utils/AppIcons';
import NavigationActions from '../../navigation';

import { getProjectsMap } from '../../selectors/projects';
import { getUserById, getUsersByIds } from '../../selectors/users';
import * as tasksActions from '../../actions/tasks';

import styles from './TaskCreateStyles';
import Colors from '../../styles/Colors';


@connect(
  (_, { projectId }) => ({ projects, tasks, users }) => {
    const project = getProjectsMap({ projects }).get(projectId);
    const ownerId = project.get('owner');
    const collaboratorsIds = project.get('collaborators');
    return {
      owner: getUserById({ users, userId: ownerId }),
      collaborators: getUsersByIds({ users, usersIds: collaboratorsIds }),
      isCreating: tasks.meta.get('creating'),
    };
  },
  dispatch => bindActionCreators({
    ...tasksActions,
  }, dispatch)
)
export default class CreateProject extends React.Component {
  static propTypes = {
    owner: ImmutablePropTypes.map.isRequired,
    collaborators: ImmutablePropTypes.list.isRequired,
    projectId: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
    taskCreateRequest: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      note: '',
      user: null,
      completionDate: undefined,
      notificationDate: undefined,
    };

    NavigationActions.setNavigator(props.navigator);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'saveTask':
        this.saveTask();
        break;
      case 'back':
        this.props.navigator.dismissModal();
        break;
      default:
        break;
    }
  };

  saveTask = () => {
    const { taskCreateRequest, projectId } = this.props;
    const { text, note, user, completionDate, notificationDate } = this.state;
    taskCreateRequest({
      text,
      note,
      project_id: projectId,
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
          autoFocus
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
      </ScrollView>
    );
  }
}
