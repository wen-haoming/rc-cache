import ActionTypes from './actionTypes';

function contextReducer(initialState = {}, action: { type: ActionTypes; payload: any }) {
  const { payload } = action
  switch (action.type) {
    case ActionTypes.CREATE:
      return {
        ...initialState,
        [payload.cacheId]: {
          element: payload.element,
          status: ActionTypes.CREATE,
          cacheId:payload.cacheId,
        }
      };
    case ActionTypes.CREATED:
      return {
        ...initialState,
        [payload.cacheId]: {
          ...initialState[payload.cacheId],
          doms: payload.doms,
          cacheId:payload.cacheId
        }
      };
    case ActionTypes.ACTIVE:
      return {};

    default:
      return initialState;
  }
}

export default contextReducer;
