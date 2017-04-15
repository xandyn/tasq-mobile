import { createSelector } from 'reselect';


export const getUsersMap = state => state.users.byId;
export const getUserId = state => state.userId;
export const getUsersIds = state => state.usersIds;

export const getUserById = createSelector(
  [getUserId, getUsersMap],
  (id, map) => map.get(id.toString())
);

export const getUsersByIds = createSelector(
  [getUsersIds, getUsersMap],
  (ids, map) => ids.map(item => map.get(item.toString()))
);
