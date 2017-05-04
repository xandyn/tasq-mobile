import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import ImmutableListView from 'react-native-immutable-list-view';

import ProjectItem from '../ProjectItem/ProjectItem';
import FabButton from '../../components/FabButton/FabButton';

import { getProjectsIds } from '../../selectors/projects';

import styles from './ProjectsStyles';


@connect(
  ({ projects }) => ({
    projectsIds: getProjectsIds({ projects }),
  }),
)
export default class Projects extends React.Component {
  static propTypes = {
    projectsIds: ImmutablePropTypes.list.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onCreateProject = () => {
    const { navigator } = this.props;
    navigator.showModal({
      screen: 'tasq.ProjectCreateScreen',
      title: 'Create new project',
    });
  };

  renderRow = (rowData) => {
    const { navigator } = this.props;
    return (
      <ProjectItem
        key={rowData}
        id={rowData.toString()}
        navigator={navigator}
      />
    );
  };

  render() {
    const { projectsIds } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={projectsIds}
          renderRow={this.renderRow}
        />
        <FabButton onPress={this.onCreateProject} />
      </View>
    );
  }
}
