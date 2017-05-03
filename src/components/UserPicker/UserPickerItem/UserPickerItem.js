import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Avatar from '../../Avatar/Avatar';

import styles from './UserPickerItemStyles';


const UserPickerItem = ({ item, onSelect }) =>
  <TouchableOpacity onPress={onSelect(item)}>
    <View style={styles.container}>
      <Avatar user={item.toJS()} size={32} />
      <Text
        style={styles.name}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {item.get('name') ? item.get('name') : item.get('email')}
      </Text>
    </View>
  </TouchableOpacity>;


UserPickerItem.propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default UserPickerItem;
