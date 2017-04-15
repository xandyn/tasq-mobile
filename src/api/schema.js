import { schema } from 'normalizr';


export const defaults = {
  meta: {
    editing: false,
    removing: false
  }
};


export const userSchema = new schema.Entity('users', {}, {
  idAttribute: 'email',
  processStrategy: value => ({ ...value, ...defaults })
});

export const usersSchema = [userSchema];


export const projectSchema = new schema.Entity('projects', {
  owner: userSchema,
  collaborators: [userSchema],
  pending_collaborators: [userSchema],
}, {
  processStrategy: value => ({ ...value, ...defaults })
});

export const projectsSchema = [projectSchema];


export const taskSchema = new schema.Entity('tasks', {
  project: projectSchema,
  creator: userSchema,
  assigned_to_user: userSchema,
  completed_by_user: userSchema,
}, {
  processStrategy: value => ({ ...value, ...defaults })
});

export const tasksSchema = [taskSchema];
