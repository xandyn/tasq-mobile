import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTasksMap } from '../../selectors/tasks';
import { iconsMap } from '../../utils/AppIcons';

import styles from './TaskEditStyles';


@connect(
  (_, { id }) => ({ tasks }) => ({
    item: getTasksMap({ tasks }).get(id),
  }),
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

  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Text>Edit: {item.get('text')}</Text>
      </View>
    );
  }
}
