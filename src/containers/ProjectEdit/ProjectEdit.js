import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProjectsMap } from '../../selectors/projects';
import { iconsMap } from '../../utils/AppIcons';

import styles from './ProjectEditStyles';


@connect(
  (_, { id }) => ({ projects }) => ({
    item: getProjectsMap({ projects }).get(id),
  }),
)
export default class ProjectEdit extends React.Component {
  static navigatorStyle = {};

  static navigatorButtons = {
    rightButtons: [{
      title: 'Save',
      id: 'saveProject',
      icon: iconsMap['ios-checkmark--big']
    }]
  };

  static propTypes = {

  };

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Text>Edit: {item.get('name')}</Text>
      </View>
    );
  }
}
