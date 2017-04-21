import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutableListView from 'react-native-immutable-list-view';

import Button from '../../components/core/Button/Button';
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
    navBarTextFontFamily: 'Lato',
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

  constructor(props) {
    super(props);

    this.state = {
      showCompletedTasks: false
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { projectId, navigator } = this.props;
    if (event.id === 'editProject') {
      navigator.push({
        screen: 'tasq.ProjectEdit',
        passProps: { id: projectId },
        backButtonTitle: '',
      });
    }
  };

  onToggleCompletedTasks = () => {
    this.setState(prevState => ({
      showCompletedTasks: !prevState.showCompletedTasks
    }));
  };

  renderRow = (rowData) => {
    return <TaskItem
      id={rowData.toString()}
      navigator={this.props.navigator}
    />;
  };

  render() {
    const { tasksIdsCompleted, tasksIdsUncompleted } = this.props;
    const { showCompletedTasks } = this.state;
    return (
      <View style={styles.container}>
        <ImmutableListView
          style={styles.tasksUncompleted}
          immutableData={tasksIdsUncompleted}
          renderRow={this.renderRow}
        />
        {tasksIdsCompleted.count() > 0 &&
          <Button onPress={this.onToggleCompletedTasks}>
            <View style={styles.tasksSwitcher}>
              <Text style={styles.tasksSwitcherText}>
                {showCompletedTasks ? 'HIDE' : 'SHOW'} COMPLETED TASKS
              </Text>
            </View>
          </Button>
        }
        {showCompletedTasks &&
          <ImmutableListView
            style={styles.tasksCompleted}
            immutableData={tasksIdsCompleted}
            renderRow={this.renderRow}
          />
        }
      </View>
    );
  }
}
