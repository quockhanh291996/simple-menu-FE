import { Instance, types } from 'mobx-state-tree';

export const USER_STATE = {
  LOGIN_WAITING: 'waiting_to_login',
  LOGIN_NOT_LOGIN: 'not_login',
  LOGIN_FAILED: 'failed_to_login',
  LOGIN_SUCCESS: 'logged_in',
};

export const UserInfo = types.model({
  id: 0,
  username: '',
  email: '',
  groups: types.array(types.number), // list id of group that user is included
});

export type IUserInfo = Instance<typeof UserInfo>;