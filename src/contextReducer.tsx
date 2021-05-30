import type { ActionTypes } from './actionTypes';

function contextReducer(initialState = {}, action: { type: ActionTypes; payload: any }) {
  switch (action.type) {
    case 'ACTIVE':
      return {};
    case 'CREATE':
      return {};
    case 'CREATED':
      return {};
    default:
      return initialState;
  }
}

export default contextReducer;
