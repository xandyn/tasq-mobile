import React from 'react';
import { View, Text } from 'react-native';
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
  ({ users, profile }, { project }) => {
    const ownerId = project.get('owner');
    const projectCollaboratorsIds = project.get('collaborators');
    const pendingCollaboratorsIds = project.get('pending_collaborators');
    return {
      profile: profile.data,
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
    profile: ImmutablePropTypes.map.isRequired,
    owner: ImmutablePropTypes.map.isRequired,
    pendingCollaborators: ImmutablePropTypes.list.isRequired,
    projectCollaborators: ImmutablePropTypes.list.isRequired,
    userInviteRequest: PropTypes.func.isRequired,
    userInviteReject: PropTypes.func.isRequired,
    collaboratorDelete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  onDeleteCollaborator = item => () => {
    const { project, collaboratorDelete, userInviteReject } = this.props;
    const projectId = project.get('id').toString();
    if (item.id) {
      collaboratorDelete(projectId, item);
    } else {
      userInviteReject(projectId, item);
    }
  };

  onButtonPress = btn => () => {
    alert(btn);
  };

  onInvite = (e) => {
    alert('invite');
  };

  handleSubmit = (values) => {
    const { submitting } = this.props;
    if (!submitting && values.email) {
      const { userInviteRequest, project } = this.props;
      userInviteRequest({ ...values, project_id: project.get('id') });
    }
  };

  render() {
    const {
      owner, profile, pendingCollaborators, projectCollaborators,
      handleSubmit, submitting
    } = this.props;
    const ownerIsCurrentUser = profile.get('email') === owner.get('email');
    return (
      <View style={styles.container}>
        <CollaboratorsList
          owner={owner}
          pendingCollaborators={pendingCollaborators}
          projectCollaborators={projectCollaborators}
          onButtonPress={this.onButtonPress}
          ownerIsCurrentUser={ownerIsCurrentUser}
        />
        <Button onPress={this.onInvite}>
          <View style={styles.invite}>
            <Icon size={30} name="ios-add" style={styles.inviteIcon} />
            <Text style={styles.inviteText}>
              Add people
            </Text>
          </View>
        </Button>
      </View>
    );
  }
}
