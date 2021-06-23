import React, { useContext, useEffect, useRef } from 'react';
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
    const scrollEventRef = useRef<(event: HTMLElementEventMap['scroll']) => void>(()=>{})

    useEffect(() => {
      return () => {
        ref.current?.removeEventListener('scroll', scrollEventRef.current, true);
      };
    }, []);

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
        if (scroll) {
          scrollEventRef.current = (event: HTMLElementEventMap['scroll']) => {
            handleScroll({ cacheId, event });
          }
          ref.current?.addEventListener('scroll', scrollEventRef.current, true);
        }
      }
    }, [contextState, dispatch, handleScroll, mount, props]);

    return <div ref={ref as any} id={`keep-alive-${cacheId}`} />;
  };
}

export default withKeepAlive;
