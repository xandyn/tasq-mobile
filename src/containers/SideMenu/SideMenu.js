import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import styles from './SideMenuStyles';


export default class SideMenu extends React.Component {

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
