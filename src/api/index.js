import { AsyncStorage } from 'react-native';
import config from '../config';


export default class Api {

  static getHeaders() {
    return AsyncStorage.getItem('jwt').then((jwt) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      if (jwt) {
        headers.JWTAuthorization = `JWT ${jwt}`;
      }

      return headers;
    });
  }

  static async fetch(url, method, payload) {
    const headers = await Api.getHeaders();
    const data = { method, headers };
    if (payload) {
      data.body = JSON.stringify(payload);
    }
    return await fetch(`${config.baseUrl}${url}`, data)
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (response.status >= 400) {
          return Promise.reject(json);
        }
        return json;
      })
      .then(
        response => ({ response }),
        error => ({ error })
      );
  }

  static storeItems(items) {
    if (typeof items === 'object') {
      AsyncStorage.multiSet(Object.entries(items));
    }
  }

  static clearItems(items) {
    if (Array.isArray(items)) {
      AsyncStorage.multiRemove(items);
    }
    if (typeof items === 'string') {
      AsyncStorage.removeItem(items);
    }
  }
}


export const login = payload => Api.fetch('/users/auth', 'POST', payload);
export const signup = payload => Api.fetch('/users/profile', 'POST', payload);

export const profile = () => Api.fetch('/users/profile', 'GET');
export const profileEdit = payload => Api.fetch('/users/profile', 'PUT', payload);

export const projects = () => Api.fetch('/projects', 'GET');
export const projectCreate = payload => Api.fetch('/projects', 'POST', payload);
export const projectEdit = (id, payload) => Api.fetch(`/projects/${id}`, 'PUT', payload);
export const projectDelete = id => Api.fetch(`/projects/${id}`, 'DELETE');
export const projectCollaboratorDelete = payload => Api.fetch('/projects/collaborators', 'DELETE', payload);

export const userInvite = payload => Api.fetch('/invites', 'POST', payload);
export const userInviteReject = payload => Api.fetch('/invites', 'DELETE', payload);
export const userInviteAccept = payload => Api.fetch('/invites', 'PUT', payload);

export const tasks = () => Api.fetch('/tasks', 'GET');
export const taskCreate = payload => Api.fetch('/tasks', 'POST', payload);
export const taskEdit = (id, payload) => Api.fetch(`/tasks/${id}`, 'PUT', payload);
export const taskDelete = id => Api.fetch(`/tasks/${id}`, 'DELETE');
