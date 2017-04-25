import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutableListView from 'react-native-immutable-list-view';

import CollaboratorsList from '../../components/CollaboratorsList/CollaboratorsList';

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

  handleSubmit = (values) => {
    const { submitting } = this.props;
    if (!submitting && values.email) {
      const { userInviteRequest, project } = this.props;
      userInviteRequest({ ...values, project_id: project.get('id') });
    }
  };

  render() {
    const {
      owner, pendingCollaborators, projectCollaborators,
      handleSubmit, submitting
    } = this.props;
    return (
      <View style={styles.container}>
        <CollaboratorsList
          owner={owner}
          pendingCollaborators={pendingCollaborators}
          projectCollaborators={projectCollaborators}
          onDeleteCollaborator={this.onDeleteCollaborator}
        />
      </View>
    );
  }
}
