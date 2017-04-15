import { createSelector } from 'reselect';
import { getSelectedProjectId } from './projects';


export const getTasksIds = state => state.tasks.allIds;
export const getTasksMap = state => state.tasks.byId;


export const getTasksAll = createSelector(
  [getTasksIds, getTasksMap],
  (ids, map) => ids.map(item => map.get(item.toString()))
);

export const getProjectTasksIds = createSelector(
  [getTasksIds, getTasksMap, getSelectedProjectId],
  (ids, map, id) => ids.filter(item => map.get(item.toString()).get('project') === +id)
);

export const getProjectTasks = createSelector(
  [getProjectTasksIds, getTasksMap],
  (ids, map) => ids.map(item => map.get(item.toString()))
);

export const getProjectTasksIdsUncompleted = createSelector(
  [getTasksIds, getTasksMap, getSelectedProjectId],
  (ids, map, id) => ids.filter((item) => {
    const task = map.get(item.toString());
    return task.get('project') === +id && task.get('is_completed') === false;
  })
);

export const getProjectTasksIdsCompleted = createSelector(
  [getTasksIds, getTasksMap, getSelectedProjectId],
  (ids, map, id) => ids.filter((item) => {
    const task = map.get(item.toString());
    return task.get('project') === +id && task.get('is_completed') === true;
  })
);
