import { createSelector } from 'reselect';


export const getProjectsIds = state => state.projects.allIds;
export const getProjectsMap = state => state.projects.byId;

export const getSelectedProjectId = state => state.ui.selectedProjectId;


export const getSelectedProject = createSelector(
  [getSelectedProjectId, getProjectsMap],
  (id, map) => map.get(id.toString())
);

export const getProjects = createSelector(
  [getProjectsIds, getProjectsMap],
  (ids, map) => ids.map(item => map.get(item.toString()))
);
