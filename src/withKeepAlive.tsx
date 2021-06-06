import React, { useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ContextType } from './context';
import context from './context';

function withKeepAlive<T extends Record<string, unknown>>(OldComponent: any) {
  const cacheId = uuidv4();

  return function (props: T) {
    const ref = useRef<HTMLElement>(null);
    const { contextState, mount, dispatch } = useContext<ContextType>(context);

    useEffect(() => {
      const currentState = contextState[cacheId];
      if (currentState && currentState.doms) {
        const { doms } = currentState;
        doms.forEach((dom) => ref.current!.appendChild(dom));
      } else {
        mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch} /> });
      }
    }, [contextState, dispatch, mount, props]);

    return <div ref={ref as any} id={`keep-alive-${cacheId}`} />;
  };
}

export default withKeepAlive;
