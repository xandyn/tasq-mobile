import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../../components/core/Button/Button';

import { getProjectsMap } from '../../selectors/projects';

import styles from './ProjectsItemStyles';


@connect(
  (_, { id }) => ({ projects }) => ({
    item: getProjectsMap({ projects }).get(id)
  }),
)
export default class ProjectsItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    item: ImmutablePropTypes.map.isRequired,
    onClickProject: PropTypes.func.isRequired,
  };

  render() {
    const { item, onClickProject } = this.props;
    const isShared = item.get('is_shared');
    return (
      <Button onPress={onClickProject(item)}>
        <View style={styles.container}>
          <Icon style={styles.icon} name={isShared ? 'ios-people-outline' : 'ios-list'} size={30} />
          <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>
            {item.get('name')}
          </Text>
        </View>
      </Button>
    );
  }
}
