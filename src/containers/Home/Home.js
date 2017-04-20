import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Projects from '../Projects/Projects';

import * as profileActions from '../../actions/profile';
import * as projectsActions from '../../actions/projects';
import * as tasksActions from '../../actions/tasks';

import styles from './HomeStyles';


@connect(
  ({ profile, projects, tasks }) => ({
    isProfileFilled: profile.meta.get('filled'),
    isProfileFetching: profile.meta.get('fetching'),
    isProjectsFetching: projects.meta.get('fetching'),
    isTasksFetching: tasks.meta.get('fetching')
  }),
  (dispatch) => bindActionCreators({
    ...profileActions,
    ...projectsActions,
    ...tasksActions,
  }, dispatch)
)
export default class Home extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
    navBarBackgroundColor: '#568D8A',
    statusBarColor: '#568D8A',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    navBarTextFontFamily: 'Lato',
    statusBarTextColorScheme: 'light',
  };

  static propTypes = {
    profileFetch: PropTypes.func.isRequired,
    projectsFetch: PropTypes.func.isRequired,
    tasksFetch: PropTypes.func.isRequired,
    isProfileFilled: PropTypes.bool.isRequired,
    isProfileFetching: PropTypes.bool.isRequired,
    isProjectsFetching: PropTypes.bool.isRequired,
    isTasksFetching: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { profileFetch, projectsFetch, tasksFetch } = this.props;

    profileFetch();
    projectsFetch();
    tasksFetch();
  }

  componentWillReceiveProps(props) {
    /*
    const { isProfileFetching, isProjectsFetching, isTasksFetching, isProfileFilled } = props;
    const isFetching = isProfileFetching || isProjectsFetching || isTasksFetching;

    if (!isFetching && isProfileFilled) {
      this.props.navigator.toggleNavBar({
        to: 'shown',
        animated: true
      });
    }
    */
  }

  render() {
    const { isProfileFetching, isProjectsFetching, isTasksFetching, isProfileFilled } = this.props;
    const isFetching = isProfileFetching || isProjectsFetching || isTasksFetching;

    if (isFetching || !isProfileFilled) {
      return (
        <ActivityIndicator
          style={styles.activity}
          size="large"
        />
      );
    }

    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <Projects navigator={navigator} />
      </View>
    );
  }
}
