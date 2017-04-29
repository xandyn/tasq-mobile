import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import ModalDateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

import styles from './DateTimePickerStyles';
import Colors from '../../styles/Colors';


export default class DateTimePicker extends React.Component {
  static defaultProps = {
    date: undefined,
    placeholder: 'Set a date',
  };

  static propTypes = {
    date: PropTypes.object,
    handleDatePicker: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  state = {
    isDateTimePickerVisible: false,
  };

  toggleDateTimePicker = () => {
    this.setState(prevState => ({
      isDateTimePickerVisible: !prevState.isDateTimePickerVisible
    }));
  };

  handleDatePicker = (date) => {
    this.props.handleDatePicker(date);
    this.toggleDateTimePicker();
  };

  clearDate = () => {
    this.props.handleDatePicker(undefined);
  };

  render() {
    const { isDateTimePickerVisible, } = this.state;
    const { date, placeholder } = this.props;
    const overdue = moment().isAfter(date);
    const calendarFormats = {
      sameDay: '[Today at] HH:mm',
      nextDay: '[Tomorrow at] HH:mm',
      lastDay: '[Yesterday at] HH:mm',
      nextWeek: 'dddd, D MMM HH:mm',
      lastWeek: 'dddd, D MMM HH:mm',
      sameElse: 'dddd, D MMM HH:mm'
    };
    const dateString = `${
      moment(date).calendar(null, calendarFormats)
    } ${
      !moment().isSame(date, 'year') ? moment(date).format('YYYY') : ''
    }`;

    return (
      <View style={styles.container}>

        {date ? (
          <TouchableWithoutFeedback onPress={this.toggleDateTimePicker}>
            <View style={styles.date}>
              <Text
                style={[styles.dateText, {
                  color: overdue ? Colors.red : Colors.textPrimary
                }]}
              >
                {dateString}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={this.toggleDateTimePicker}>
            <View>
              <Text style={styles.placeholder}>{placeholder}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        <View style={styles.clear}>
          <TouchableOpacity onPress={this.clearDate}>
            <Icon name="close" size={20} color={Colors.icon} />
          </TouchableOpacity>
        </View>

        <ModalDateTimePicker
          is24Hour
          date={date}
          mode="datetime"
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicker}
          onCancel={this.toggleDateTimePicker}
        />

      </View>
    );
  }
}
