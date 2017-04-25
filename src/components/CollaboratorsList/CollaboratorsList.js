import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CollaboratorItem from './CollaboratorItem/CollaboratorItem';

import styles from './CollaboratorsListStyles';


const CollaboratorsList = ({ owner, pendingCollaborators, projectCollaborators, ...rest }) =>
  <View style={styles.container}>

    <CollaboratorItem item={owner} status="owner" {...rest} />

    {pendingCollaborators.map(item =>
      <CollaboratorItem key={item.get('email')} item={item} status="pending" {...rest} />
    )}

    {projectCollaborators.map(item =>
      <CollaboratorItem key={item.get('email')} item={item} status="collaborator" {...rest} />
    )}

  </View>;


CollaboratorsList.propTypes = {
  owner: ImmutablePropTypes.map.isRequired,
  pendingCollaborators: ImmutablePropTypes.list.isRequired,
  projectCollaborators: ImmutablePropTypes.list.isRequired,
  onDeleteCollaborator: PropTypes.func.isRequired,
};


export default CollaboratorsList;
