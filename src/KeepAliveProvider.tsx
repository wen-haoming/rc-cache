import type { ReactElement } from 'react';
import { useReducer } from 'react';
import context from './context';
import contextReducer from './contextReducer';

interface Props {
  children?: ReactElement;
}

function KeepAliveProvider(props: Props): ReactElement {
  const [contextState, dispatch] = useReducer(contextReducer, {});

  return <context.Provider value={{ contextState, dispatch }}>{props.children}</context.Provider>;
}

export default KeepAliveProvider;
