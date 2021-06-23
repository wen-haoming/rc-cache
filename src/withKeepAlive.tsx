import React, { useContext, useEffect, useRef } from 'react';
import { ReactEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ContextType } from './context';
import context from './context';

interface Options {
  scroll?: boolean;
}

function withKeepAlive<T extends Record<string, unknown>>(
  OldComponent: React.FC<T> | React.ClassicComponentClass<T>,
  options?: Options,
) {
  const { scroll } = options || {};
  const cacheId = uuidv4();

  return function (props: T) {
    const { contextState, mount, dispatch, handleScroll } = useContext<ContextType>(context);

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      const scrollEvent = (event: HTMLElementEventMap['scroll']) => handleScroll({ cacheId, event });
      if (scroll) {
        ref.current?.addEventListener('scroll', scrollEvent, true);
      }
      return () => {
        if (scroll) {
          ref.current?.removeEventListener('scroll', scrollEvent);
        }
      };
    }, [handleScroll]);

    useEffect(() => {
      const currentState = contextState[cacheId];
      if (currentState && currentState.doms) {
        const { doms } = currentState;
        doms.forEach((dom) => ref.current!.appendChild(dom));
        if (scroll) {
          doms.forEach((dom) => {
            if (currentState.scrolls.get(dom)) {
              dom.scrollTop = currentState.scrolls.get(dom);
            }
          });
        }
      } else {
        mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch} /> });
      }
    }, [contextState, dispatch, mount, props, scroll]);

  

    return <div ref={ref as any}  id={`keep-alive-${cacheId}`} />;
  };
}

export default withKeepAlive;
