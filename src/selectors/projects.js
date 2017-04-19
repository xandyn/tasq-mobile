import { createSelector } from 'reselect';


export const getProjectsIds = state => state.projects.allIds;
export const getProjectsMap = state => state.projects.byId;

export const getProjectId = state => state.projectId;


export const getProjectById = createSelector(
  [getProjectId, getProjectsMap],
  (id, map) => map.get(id.toString())
);

export const getProjects = createSelector(
  [getProjectsIds, getProjectsMap],
  (ids, map) => ids.map(item => map.get(item.toString()))
);
