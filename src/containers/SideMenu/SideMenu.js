import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './SideMenuStyles';


export default class SideMenu extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Side Menu</Text>

        <TouchableOpacity onPress={this.toggleDrawer}>
          <Text style={styles.button}>Close</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
