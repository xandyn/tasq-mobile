import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutableListView from 'react-native-immutable-list-view';

import ProjectsItem from '../ProjectsItem/ProjectsItem';

import { getProjectsIds } from '../../selectors/projects';

import styles from './ProjectsStyles';


@connect(
  ({ projects, ui }) => ({
    projectsIds: getProjectsIds({ projects }),
  }),
)
export default class Projects extends React.Component {
  static propTypes = {
    projectsIds: ImmutablePropTypes.list.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  onClickProject = (item) => (e) => {
    this.props.navigator.push({
      screen: 'tasq.Tasks',
      title: item.get('name'),
      passProps: {
        id: item.get('id')
      },
      backButtonTitle: '',
    })
  };

  renderRow = (rowData) => {
    return <ProjectsItem
      id={rowData.toString()}
      onClickProject={this.onClickProject}
    />;
  };

  render() {
    const { projectsIds } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={projectsIds}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
