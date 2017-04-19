import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutableListView from 'react-native-immutable-list-view';

import TaskItem from '../TaskItem/TaskItem';

import { getProjectTasksIdsCompleted, getProjectTasksIdsUncompleted } from '../../selectors/tasks';
import { iconsMap } from '../../utils/AppIcons';

import styles from './TasksStyles';


@connect(
  (_, { projectId }) => ({ tasks }) => ({
    tasksIdsCompleted: getProjectTasksIdsCompleted({ tasks, projectId }),
    tasksIdsUncompleted: getProjectTasksIdsUncompleted({ tasks, projectId }),
  }),
)
export default class Tasks extends React.Component {
  static navigatorStyle = {
    navBarTextFontFamily: 'Lato'
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Edit',
      id: 'editProject',
      icon: iconsMap['pencil']
    }]
  };

  static propTypes = {
    tasksIdsCompleted: ImmutablePropTypes.list.isRequired,
    tasksIdsUncompleted: ImmutablePropTypes.list.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  renderRow = (rowData) => {
    return <TaskItem
      id={rowData.toString()}
      navigator={this.props.navigator}
    />;
  };

  render() {
    const { tasksIdsCompleted, tasksIdsUncompleted } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={tasksIdsUncompleted}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
