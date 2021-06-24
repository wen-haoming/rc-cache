import React, { useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ContextType } from './context';
import context from './context';

interface Options {
  scroll?: boolean;
  cacheId?: string;
}

function withKeepAlive<T extends Record<string, unknown>>(
  OldComponent: React.FC<T> | React.ClassicComponentClass<T>,
  options?: Options,
) {
  // eslint-disable-next-line prefer-const
  let { scroll, cacheId = '' } = options || {};
  cacheId = cacheId || uuidv4().slice(0, 4);

  return function (props: T) {
    const { contextState, mount, dispatch, handleScroll,dispatchAction } = useContext<ContextType>(context);

    const ref = useRef<HTMLElement>(null);
    const scrollEventRef = useRef<(event: HTMLElementEventMap['scroll']) => void>(() => {});

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
          scrollEventRef.current = (event: HTMLElementEventMap['scroll']) => {
            handleScroll({ cacheId, event });
          };
          doms.forEach((dom) => {
            if (currentState.scrolls.get(dom)) {
              dom.scrollTop = currentState.scrolls.get(dom);
            }
          });
          ref.current?.addEventListener('scroll', scrollEventRef.current, true);
        }
      } else {
        mount({ cacheId, element: <OldComponent {...props} dispatchAction={dispatchAction} /> });
      }
    }, [contextState, dispatch, handleScroll, mount, props]);

    return <div ref={ref as any} id={`keep-alive-${cacheId}`} />;
  };
}

export default withKeepAlive;
