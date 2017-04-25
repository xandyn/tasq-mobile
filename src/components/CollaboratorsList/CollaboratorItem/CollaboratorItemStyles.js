import { StyleSheet } from 'react-native';
import BaseStyles from '../../../styles/Base';


export default StyleSheet.create({
  container: {
    ...BaseStyles.container,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 50,
    borderTopWidth: 1,
    borderColor: '#eeeeee',
  },
  avatar: {
  },
  name: {
    ...BaseStyles.text,
    marginHorizontal: 15,
    flexShrink: 1,
  },
  status: {
    marginLeft: 'auto',
  },
  statusText: {
    ...BaseStyles.text,
    paddingHorizontal: 6,
    paddingTop: 1,
    fontSize: 9,
    borderRadius: 7,
    borderWidth: 0.8,
  },
  ownerColor: {
    borderColor: '#3FA9F5',
    color: '#3FA9F5',
  },
  pendingColor: {
    borderColor: '#E7BB09',
    color: '#E7BB09',
  },
  collaboratorColor: {
    borderColor: '#4DBBBD',
    color: '#4DBBBD',
  },
});
