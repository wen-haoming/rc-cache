import type { ReactElement } from 'react';
import React from 'react';
import type ActionType from './actionTypes';

export type ContextType = {
  contextState: Record<
    string,
    {
      element?: ReactElement;
      status?: ActionType;
      cacheId?: string;
      doms?: HTMLElement[];
      scrolls: WeakMap<any, any>;
    }
  >;
  mount: (props: { cacheId: string; element: ReactElement }) => void;
  dispatch: (props: { type: ActionType; payload: any }) => void;
  handleScroll: (options: { cacheId: string; event: any }) => void;
  dispatchAction: (options: {type: ActionType.DESTROY,payload: any}) => void;
};

export default React.createContext<ContextType>({} as ContextType);
