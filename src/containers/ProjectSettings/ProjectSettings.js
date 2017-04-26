import React from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Colors from '../../styles/Colors';
import styles from './ProjectSettingsStyles';


export default class ProjectSettings extends React.Component {
  static propTypes = {
  };

  state = {
    email: false,
    telegram: false,
  };

  render() {
    const { email, telegram } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Telegram notifications</Text>
          <Switch
            onValueChange={v => this.setState({ telegram: v })}
            value={telegram}
            onTintColor={Colors.primary}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Email notifications</Text>
          <Switch
            onValueChange={v => this.setState({ email: v })}
            value={email}
            onTintColor={Colors.primary}
          />
        </View>
      </View>
    );
  }
}
