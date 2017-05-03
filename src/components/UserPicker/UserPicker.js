import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Avatar from '../Avatar/Avatar';
import Button from '../core/Button/Button';
import UserPickerItem from './UserPickerItem/UserPickerItem';

import styles from './UserPickerStyles';
import modalStyles from './modal.style';
import Colors from '../../styles/Colors';


export default class UserPicker extends React.Component {
  static defaultProps = {
    user: undefined,
    placeholder: 'Assign to',
  };

  static propTypes = {
    user: ImmutablePropTypes.map,
    items: ImmutablePropTypes.list.isRequired,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  };

  state = {
    isUserPickerVisible: false,
  };

  onSelect = user => () => {
    this.props.onSelect(user);
    this.toggleUserPicker();
  };

  toggleUserPicker = () => {
    this.setState(prevState => ({
      isUserPickerVisible: !prevState.isUserPickerVisible
    }));
  };

  clearUser = () => {
    this.props.onSelect(null);
  };

  render() {
    const { isUserPickerVisible } = this.state;
    const { user, placeholder, items } = this.props;
    return (
      <View style={styles.container}>

        <View>
          <TouchableOpacity onPress={this.toggleUserPicker}>
            {user ? (
              <View style={styles.user}>
                <Avatar user={user.toJS()} size={32} />
                <Text
                  style={styles.name}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {user.get('name') ? user.get('name') : user.get('email')}
                </Text>
              </View>
            ) : (
              <View style={styles.user}>
                <Text style={styles.placeholder}>{placeholder}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.clearBtn}>
          <TouchableOpacity onPress={this.clearUser}>
            <Icon name="close" size={20} color={Colors.icon} />
          </TouchableOpacity>
        </View>

        <Modal style={modalStyles.modalContainer} isVisible={isUserPickerVisible}>
          <View
            style={modalStyles.userPickerContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={modalStyles.titleContainer}>
              <Text style={modalStyles.title}>Assign to</Text>
            </View>
            <View style={modalStyles.usersContainer}>
              {items.map(item =>
                <UserPickerItem
                  key={item.get('email')}
                  item={item}
                  onSelect={this.onSelect}
                />
              )}
            </View>
          </View>
          <Button style={modalStyles.cancelButton} onPress={this.toggleUserPicker}>
            <View style={modalStyles.cancelButton}>
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </View>
          </Button>
        </Modal>
      </View>
    );
  }
}
