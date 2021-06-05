import React, { useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import context, { ContextType } from './context';


function withKeepAlive<T extends object>(OldComponent: any) {
    const cacheId = uuidv4()

    return function (props: T) {
        const divRef = useRef<HTMLElement>(null)
        const { contextState, mount, dispatch } = useContext<ContextType>(context)

        useEffect(() => {
            const currentState = contextState[cacheId];
            if (currentState && currentState.doms) {
                const {doms} = currentState;
                doms.forEach(dom => divRef.current!.appendChild(dom));
            } else {
                mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch} /> })
            }
        }, [contextState, dispatch, mount, props, OldComponent]);


        return <div ref={divRef} id={`keep-alive-${cacheId}`} />
    }
}

export default withKeepAlive;
