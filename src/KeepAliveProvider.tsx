import type { ReactElement } from 'react';
import React, { useReducer } from 'react';
import actionTypes from './actionTypes';
import context from './context';
import contextReducer from './contextReducer';
interface Props {
  children?: ReactElement;
}

function KeepAliveProvider(props?: Props): ReactElement {
  const [contextState, dispatch] = useReducer(contextReducer, {});

  const mount = (({ cacheId, element }: { cacheId: string, OldComponent: any }) => {
    if (!contextState[cacheId]) {
      dispatch({
        type: actionTypes.CREATE,
        payload: {
          element,
          cacheId
        }
      });
    }
  })

  console.log(contextState,'contextState')

  return <context.Provider value={{ contextState, dispatch, mount }}>
    <>
    {props!.children}
    {
      Object.values(contextState).map(({ cacheId, element }) => {

        return <div id={`ele-${cacheId}`} key={cacheId} ref={(dom) => {
          let currentState = contextState[cacheId]
          if (dom && !currentState.doms) {
            dispatch({
              type: actionTypes.CREATED,
              payload: {
                doms: [...dom.childNodes],
                cacheId
              }
            })
          }
        }}>
          {element}
        </div>
      })
    }
    </>
  </context.Provider>;
}

export default KeepAliveProvider;
