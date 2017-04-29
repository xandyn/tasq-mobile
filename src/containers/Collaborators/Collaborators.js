import React from 'react';
import { View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';

import CollaboratorsList from '../../components/CollaboratorsList/CollaboratorsList';
import Button from '../../components/core/Button/Button';

import { getUserById, getUsersByIds } from '../../selectors/users';

import * as projectsActions from '../../actions/projects';
import * as usersActions from '../../actions/users';

import styles from './CollaboratorsStyles';


@connect(
  ({ users }, { project }) => {
    const ownerId = project.get('owner');
    const projectCollaboratorsIds = project.get('collaborators');
    const pendingCollaboratorsIds = project.get('pending_collaborators');
    return {
      owner: getUserById({ users, userId: ownerId }),
      pendingCollaborators: getUsersByIds({ users, usersIds: pendingCollaboratorsIds }),
      projectCollaborators: getUsersByIds({ users, usersIds: projectCollaboratorsIds }),
    };
  },
  dispatch => bindActionCreators({
    ...projectsActions,
    ...usersActions,
  }, dispatch)
)
export default class Collaborators extends React.Component {
  static propTypes = {
    project: ImmutablePropTypes.map.isRequired,
    owner: ImmutablePropTypes.map.isRequired,
    pendingCollaborators: ImmutablePropTypes.list.isRequired,
    projectCollaborators: ImmutablePropTypes.list.isRequired,
    userInviteRequest: PropTypes.func.isRequired,
    userInviteReject: PropTypes.func.isRequired,
    collaboratorDelete: PropTypes.func.isRequired,
    ownerIsCurrentUser: PropTypes.bool.isRequired,
  };

  onDeleteCollaborator = (item) => {
    const { project, collaboratorDelete, userInviteReject } = this.props;
    const projectId = project.get('id').toString();
    if (item.id) {
      collaboratorDelete(projectId, item);
    } else {
      userInviteReject(projectId, item);
    }
  };

  onButtonPress = item => name => () => {
    switch (name) {
      case 'promote':
        Alert.alert(
          'Give leader',
          'Are you sure want give leader to this collaborator?\nThis is can not be undone.',
          [{
            text: 'Cancel', style: 'cancel'
          }, {
            text: 'OK', onPress: () => {}, style: 'default'
          }],
        );
        break;
      case 'delete':
        Alert.alert(
          'Delete this collaborator?',
          '',
          [{
            text: 'Cancel', style: 'cancel'
          }, {
            text: 'Delete', onPress: () => this.onDeleteCollaborator(item), style: 'destructive'
          }],
        );
        break;
      default:
        break;
    }
  };

  onInvite = (e) => {
    alert('invite');
  };

  render() {
    const { owner, pendingCollaborators, projectCollaborators, ownerIsCurrentUser } = this.props;
    return (
      <View style={styles.container}>
        <CollaboratorsList
          owner={owner}
          pendingCollaborators={pendingCollaborators}
          projectCollaborators={projectCollaborators}
          onButtonPress={this.onButtonPress}
          ownerIsCurrentUser={ownerIsCurrentUser}
        />
        {ownerIsCurrentUser &&
          <Button onPress={this.onInvite}>
            <View style={styles.invite}>
              <Icon size={30} name="ios-add" style={styles.inviteIcon} />
              <Text style={styles.inviteText}>
                Add people
              </Text>
            </View>
          </Button>
        }
      </View>
    );
  }
}
