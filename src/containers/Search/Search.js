import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import ImmutableListView from 'react-native-immutable-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

import TaskItem from '../TaskItem/TaskItem';

import styles from './SearchStyles';


@connect(
  ({ tasks }) => ({
    tasks: tasks.byId,
  })
)
export default class Search extends React.Component {
  static propTypes = {
    tasks: ImmutablePropTypes.map.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  state = {
    searchQuery: ''
  };

  renderRow = (rowData) => {
    const { navigator } = this.props;
    return (
      <TaskItem
        key={rowData}
        id={rowData.toString()}
        navigator={navigator}
      />
    );
  };

  render() {
    const { tasks, navigator } = this.props;
    const { searchQuery } = this.state;
    const searchResults = tasks.filter(item => item.find((value, key) =>
      ['text', 'creator', 'note'].includes(key) && (value && value.includes(searchQuery))
    )).sort(item => item.get('is_completed'));
    const tasksIds = searchResults.keySeq().toList();

    return (
      <View style={styles.container}>
        <View style={styles.navBarWrapper}>
          <View style={styles.navBar}>
            <View style={styles.backBtn}>
              <TouchableOpacity onPress={() => navigator.pop()}>
                <Icon name="ios-arrow-round-back" size={35} color="white" />
              </TouchableOpacity>
            </View>
            <TextInput
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="white"
              style={styles.input}
              value={searchQuery}
              onChangeText={v => this.setState({ searchQuery: v })}
              placeholder="Search..."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
            <View style={styles.clearBtn}>
              <TouchableOpacity onPress={() => this.setState({ searchQuery: '' })}>
                <Icon name="ios-close" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {!!searchQuery &&
          <ImmutableListView
            style={{ flexGrow: 0 }}
            immutableData={tasksIds}
            renderRow={this.renderRow}
          />
        }
      </View>
    );
  }
}
