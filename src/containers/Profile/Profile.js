import React from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Button from '../../components/core/Button/Button';
import Avatar from '../../components/Avatar/Avatar';
import NavigationActions from '../../navigation';

import * as profileActions from '../../actions/profile';
import * as authActions from '../../actions/auth';

import Colors from '../../styles/Colors';
import styles from './ProfileStyles';


@connect(
  ({ profile }) => ({
    profile: profile.data,
  }),
  dispatch => bindActionCreators({
    ...profileActions,
    ...authActions,
  }, dispatch)
)
export default class Profile extends React.Component {
  static propTypes = {
    profile: ImmutablePropTypes.map.isRequired,
    navigator: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { profile, navigator } = props;

    this.state = {
      name: profile.get('name'),
    };

    NavigationActions.setNavigator(navigator);
    navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch (event.id) {
      case 'saveProfile':
        this.saveProfile();
        break;
      default:
        break;
    }
  };

  onLogout = () => {
    const onPress = () => {
      this.props.logout();
    };
    Alert.alert(
      'Are you sure to logout?',
      '',
      [{
        text: 'No', style: 'cancel'
      }, {
        text: 'Yes', onPress, style: 'destructive'
      }],
    );
  };

  saveProfile = () => {};

  render() {
    const { profile } = this.props;
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Avatar user={profile.toJS()} size={96} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              value={name}
              onChangeText={v => this.setState({ name: v })}
              placeholder="Your name"
              selectionColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={styles.menu}>
          <Button onPress={this.onLogout}>
            <View style={styles.menuItem}>
              <Icon style={styles.menuIcon} name="logout" size={20} color={Colors.icon} />
              <Text style={styles.menuText}>Logout</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}
