import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Button from '../../components/core/Button/Button';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import { getTasksMap } from '../../selectors/tasks';
import { iconsMap } from '../../utils/AppIcons';
import NavigationActions from '../../navigation';

import * as tasksActions from '../../actions/tasks';

import styles from './TaskEditStyles';
import Colors from '../../styles/Colors';


@connect(
  (_, { id }) => ({ tasks }) => ({
    item: getTasksMap({ tasks }).get(id),
  }),
  dispatch => bindActionCreators({
    ...tasksActions,
  }, dispatch)
)
export default class TaskEdit extends React.Component {
  static navigatorStyle = {};

  static navigatorButtons = {
    rightButtons: [{
      title: 'Save',
      id: 'saveTask',
      icon: iconsMap['ios-checkmark--big']
    }]
  };

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    id: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    taskEditRequest: PropTypes.func.isRequired,
    taskDeleteRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { item, navigator } = props;

    const text = item.get('text');
    const note = item.get('note') || '';
    const completed = item.get('is_completed');
    const completionDate = item.get('completion_date')
      ? moment(item.get('completion_date')).toDate() : undefined;
    const notificationDate = item.get('notification_date')
      ? moment(item.get('notification_date')).toDate() : undefined;

    this.state = {
      text,
      note,
      completed,
      completionDate,
      notificationDate
    };

    NavigationActions.setNavigator(navigator);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { text, note, completionDate, notificationDate } = this.state;
    const { id, taskEditRequest } = this.props;
    switch (event.id) {
      case 'saveTask':
        taskEditRequest(id, {
          text,
          note,
          completion_date: completionDate ? moment(completionDate).format() : null,
          notification_date: notificationDate ? moment(notificationDate).format() : null,
        });
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

  render() {
    const { text, note, completionDate, notificationDate } = this.state;
    return (
      <View style={styles.container}>
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
        <Button onPress={this.onDelete}>
          <View style={styles.delete} elevation={1}>
            <Text style={styles.deleteText}>
              DELETE TASK
            </Text>
          </View>
        </Button>
      </View>
    );
  }
}
