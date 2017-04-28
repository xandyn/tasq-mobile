import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

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
      ? moment(item.get('completion_date')).format() : '';
    const notificationDate = item.get('notification_date')
      ? moment(item.get('notification_date')).format() : '';

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
    const { id, taskEditRequest } = this.props;
    switch (event.id) {
      case 'saveProject':
        taskEditRequest(id, {  });
        break;
      default:
        break;
    }
  };

  onChangeTaskText = (text) => {
    this.setState({ text });
  };
  render() {
    const { text, note, completed, completionDate, notificationDate } = this.state;
    const { item } = this.props;
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
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={text}
          name="text"
          onChangeText={this.onChangeTaskText}
          placeholder="Project name"
          underlineColorAndroid="transparent"
        />
        <View style={styles.datePicker}>
          <Text
            style={[styles.datePickerText, {
              color: overdue ? Colors.red : Colors.textPrimary
            }]}
          >
            {moment(completionDate).calendar(null, calendarFormats)}
            {!moment().isSame(completionDate, 'year') && moment(completionDate).format(' YYYY')}
          </Text>
        </View>
      </View>
    );
  }
}
