import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal';
import FabModal from '../../components/FabModal/FabModal';

import * as projectsActions from '../../actions/projects';


@connect(
  ({ projects }) => ({
    isCreating: projects.meta.get('creating'),
  }),
  dispatch => bindActionCreators({
    ...projectsActions,
  }, dispatch)
)
class CreateProject extends React.Component {
  static propTypes = {
    isCreating: PropTypes.bool.isRequired,
    projectCreateRequest: PropTypes.func.isRequired,
  };

  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { open } = this.state;
    const { isCreating, projectCreateRequest } = this.props;
    return (
      <FabModal open={open} toggleModal={this.toggleModal}>
        <CreateProjectModal
          isCreating={isCreating}
          projectCreateRequest={projectCreateRequest}
          toggleModal={this.toggleModal}
        />
      </FabModal>
    );
  }
}


export default CreateProject;
