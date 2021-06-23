import type { ReactElement } from 'react';
import React, { useCallback, useReducer } from 'react';
import actionTypes from './actionTypes';
import type { ContextType } from './context';
import context from './context';
import contextReducer from './contextReducer';

interface Props {
  children?: ReactElement;
}

function KeepAliveProvider(props?: Props): ReactElement {
  const [contextState, dispatch] = useReducer<typeof contextReducer>(contextReducer, {});

  const mount = useCallback<ContextType['mount']>(
    ({ cacheId, element }) => {
      if (!contextState[cacheId]) {
        dispatch({
          type: actionTypes.CREATE,
          payload: {
            element,
            cacheId,
          },
        });
      }
    },
    [contextState],
  );

  const handleScroll = useCallback(
    ({ cacheId, event }: { cacheId: string; event: HTMLElementEventMap['scroll'] }) => {
      if (contextState[cacheId] &&  event.target ) {
        const {target} = event;
        const {scrolls} = contextState[cacheId];
        scrolls.set(target, target.scrollTop);
      }
    },
    [contextState],
  );

  return (
    <context.Provider value={{ contextState, dispatch, mount, handleScroll }}>
      <>
        {props!.children}
        {Object.values(contextState).map(({ cacheId, element }) => {
          return (
            <div
              id={`keep-alive-element-${cacheId}`}
              key={cacheId}
              style={{ display: 'none' }}
              ref={(dom) => {
                const currentState = contextState[cacheId as string];
                if (dom && !currentState.doms) {
                  dispatch({
                    type: actionTypes.CREATED,
                    payload: {
                      doms: [...dom.childNodes],
                      cacheId,
                    },
                  });
                }
              }}
            >
              {element}
            </div>
          );
        })}
      </>
    </context.Provider>
  );
}

export default KeepAliveProvider;
