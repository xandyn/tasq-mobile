import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import ImmutableListView from 'react-native-immutable-list-view';

import Button from '../../components/core/Button/Button';
import FabButton from '../../components/FabButton/FabButton';
import TaskItem from '../TaskItem/TaskItem';

import { getProjectTasksIdsCompleted, getProjectTasksIdsUncompleted } from '../../selectors/tasks';
import { getProjectsMap } from '../../selectors/projects';
import { iconsMap } from '../../utils/AppIcons';

import styles from './TasksStyles';


@connect(
  (_, { projectId }) => ({ tasks, projects, }) => ({
    project: getProjectsMap({ projects }).get(projectId),
    tasksIdsCompleted: getProjectTasksIdsCompleted({ tasks, projectId }),
    tasksIdsUncompleted: getProjectTasksIdsUncompleted({ tasks, projectId }),
  }),
)
export default class Tasks extends React.Component {
  static navigatorStyle = {
    navBarTextFontFamily: 'Lato',
    navBarTitleTextCentered: true,
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Edit',
      id: 'editProject',
      icon: iconsMap.pencil
    }]
  };

  static propTypes = {
    project: ImmutablePropTypes.map.isRequired,
    tasksIdsCompleted: ImmutablePropTypes.list.isRequired,
    tasksIdsUncompleted: ImmutablePropTypes.list.isRequired,
    projectId: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showCompletedTasks: false
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillReceiveProps(nextProps) {
    const currentTasksIdsCompletedCount = this.props.tasksIdsCompleted.count();
    const nextTasksIdsCompletedCount = nextProps.tasksIdsCompleted.count();
    const { showCompletedTasks } = this.state;
    if (!showCompletedTasks && currentTasksIdsCompletedCount !== nextTasksIdsCompletedCount) {
      this.setState({ showCompletedTasks: true });
    }
    if (showCompletedTasks && nextTasksIdsCompletedCount === 0) {
      this.setState({ showCompletedTasks: false });
    }
  }

  onNavigatorEvent = (event) => {
    const { projectId, project, navigator } = this.props;
    switch (event.id) {
      case 'willAppear':
        navigator.setTitle({
          title: project.get('name')
        });
        break;
      case 'editProject':
        navigator.push({
          title: 'Edit project',
          screen: 'tasq.ProjectEdit',
          passProps: { id: projectId },
          backButtonTitle: '',
        });
        break;
      default:
        break;
    }
  };

  onToggleCompletedTasks = () => {
    this.setState(prevState => ({
      showCompletedTasks: !prevState.showCompletedTasks
    }));
  };

  onCreateTask = () => {
    const { navigator, projectId } = this.props;
    navigator.showModal({
      screen: 'tasq.TaskCreate',
      title: 'Create new task',
      passProps: { projectId }
    });
  };

  renderRow = (rowData) => {
    const { navigator } = this.props;
    return (
      <TaskItem
        key={rowData}
        id={rowData.toString()}
        navigator={navigator}
      />
    );
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
            <View style={styles.tasksSwitcher} elevation={1}>
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
        <FabButton onPress={this.onCreateTask} />
      </View>
    );
  }
}
