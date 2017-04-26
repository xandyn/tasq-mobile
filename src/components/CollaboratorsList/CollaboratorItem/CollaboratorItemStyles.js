import { StyleSheet } from 'react-native';
import BaseStyles from '../../../styles/Base';
import Colors from '../../../styles/Colors';


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
    marginBottom: 1,
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
    borderColor: Colors.status.owner,
    color: Colors.status.owner,
  },
  pendingColor: {
    borderColor: Colors.status.pending,
    color: Colors.status.pending,
  },
  collaboratorColor: {
    borderColor: Colors.status.collaborator,
    color: Colors.status.collaborator,
  },
});
