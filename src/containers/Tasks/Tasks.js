import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutableListView from 'react-native-immutable-list-view';

import { getProjectsIds } from '../../selectors/tasks';

import styles from './TasksStyles';


@connect(
  (_, { id }) => ({ projects }) => ({
    // item: getProjectsMap({ projects }).get(id)
  }),
)
export default class Tasks extends React.Component {
  static navigatorStyle = {
    navBarTextFontFamily: 'Lato'
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
      }
    ]
  };

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
      </View>
    );
  }
}
