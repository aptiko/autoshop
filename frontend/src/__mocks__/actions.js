import C from '../constants';

export const fetchUsers = () => ({
  type: C.FETCHED_USERS,
  users: [],
});
