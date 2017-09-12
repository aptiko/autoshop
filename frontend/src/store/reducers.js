import C from '../constants';

const repair = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_REPAIR:
      return {
        id: action.id,
        assignedUser: action.assignedUser,
        date: action.date,
        time: action.time,
        complete: action.complete,
      };

    case C.EDIT_REPAIR:
      return state.id === action.id ? {
        id: action.id,
        assignedUser: action.assignedUser,
        date: action.date,
        time: action.time,
        complete: action.complete,
      } : state;

    default:
      return state;
  }
};

export const repairs = (state = [], action) => {
  switch (action.type) {
    case C.ADD_REPAIR:
      return [
        ...state,
        repair({}, action),
      ].sort((a, b) => (a.date - b.date) || (a.time - b.time));

    case C.EDIT_REPAIR:
      return state.map(r => repair(r, action))
        .sort((a, b) => (a.date - b.date) || (a.time - b.time));

    case C.REMOVE_REPAIR:
      return state.filter(r => r.id !== action.id);

    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_USER:
      return {
        id: action.id,
        username: action.username,
        role: action.role,
      };

    case C.EDIT_USER:
      return state.id === action.id ? {
        id: action.id,
        username: action.username,
        role: action.role,
      } : state;

    default:
      return state;
  }
};

export const users = (state = [], action) => {
  switch (action.type) {
    case C.ADD_USER:
      return [
        ...state,
        user({}, action),
      ];
    case C.EDIT_USER:
      return state.map(u => user(u, action));
    case C.REMOVE_USER:
      return state.filter(u => u.id !== action.id);
    default:
      return state;
  }
};
