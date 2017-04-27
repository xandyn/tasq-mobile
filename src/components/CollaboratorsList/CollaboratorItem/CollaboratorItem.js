import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Avatar from '../../Avatar/Avatar';
import CollaboratorIR from '../../InteractableRow/CollaboratorIR/CollaboratorIR';

import styles from './CollaboratorItemStyles';


const CollaboratorItem = ({ item, status, onButtonPress, ownerIsCurrentUser }) => {
  const row = (
    <View style={styles.container}>
      <Avatar style={styles.avatar} user={item.toJS()} size={32} />
      <Text
        style={styles.name}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {item.get('name') ? item.get('name') : item.get('email')}
      </Text>
      <View style={styles.status}>
        <Text allowFontScaling={false} style={[styles.statusText, styles[`${status}Color`]]}>
          {status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  if (ownerIsCurrentUser && status !== 'owner') {
    return (
      <CollaboratorIR onButtonPress={onButtonPress(item.toJS())}>
        {row}
      </CollaboratorIR>
    );
  }

  return row;
};


CollaboratorItem.propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  ownerIsCurrentUser: PropTypes.bool.isRequired,
};


export default CollaboratorItem;
