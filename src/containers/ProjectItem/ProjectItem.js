import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Button from '../../components/core/Button/Button';

import { getProjectsMap } from '../../selectors/projects';
import { getProjectTasksIdsUncompleted } from '../../selectors/tasks';

import styles from './ProjectItemStyles';


@connect(
  (_, { id }) => ({ projects, tasks }) => ({
    item: getProjectsMap({ projects }).get(id),
    tasksIdsUncompleted: getProjectTasksIdsUncompleted({ tasks, projectId: id }),
  }),
)
export default class ProjectItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    tasksIdsUncompleted: ImmutablePropTypes.list.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onClickProject = () => {
    const { id, item, navigator } = this.props;
    navigator.push({
      screen: 'tasq.TasksScreen',
      title: item.get('name'),
      passProps: {
        projectId: id
      },
      backButtonTitle: '',
    });
  };

  render() {
    const { item, tasksIdsUncompleted } = this.props;
    const isShared = item.get('is_shared');
    return (
      <Button onPress={this.onClickProject}>
        <View style={styles.container}>
          <Icon style={styles.icon} name={isShared ? 'people' : 'list'} size={20} />
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {item.get('name')}
          </Text>
          <Text style={styles.notifications}>
            {!!tasksIdsUncompleted.count() && tasksIdsUncompleted.count()}
          </Text>
        </View>
      </Button>
    );
  }
}
