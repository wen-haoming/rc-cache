import ActionTypes from './actionTypes';
import type { ContextType } from './context';

function contextReducer(
  initialState: ContextType['contextState'] = {},
  action: { type: ActionTypes; payload: any },
) {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.CREATE:
      return {
        ...initialState,
        [payload.cacheId]: {
          element: payload.element,
          status: ActionTypes.CREATE,
          cacheId: payload.cacheId,
          scrolls: new WeakMap() // 滚动保存数据
        },
      };
    case ActionTypes.CREATED:
      return {
        ...initialState,
        [payload.cacheId]: {
          ...initialState[payload.cacheId],
          doms: payload.doms,
          cacheId: payload.cacheId,
        },
      };
    case ActionTypes.ACTIVE:
      return {};

    default:
      return initialState;
  }
}

export default contextReducer;
