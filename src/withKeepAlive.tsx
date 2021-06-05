import React, { useContext, useEffect, useRef } from 'react';
import context from './context';

function withKeepAlive(OldComponent: any) {
    const cacheId = Math.floor(Math.random()*1000)

    return function (props) {
        const divRef = useRef(null)
        const { contextState, mount,dispatch } = useContext(context)

        useEffect(() => {
            let currentState = contextState[cacheId];
            if(currentState && currentState.doms){
                 let doms = currentState.doms;
                 doms.forEach(dom=>divRef.current.appendChild(dom));
            }else{
                mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch}/> })
            }
        }, [contextState, dispatch, mount, props,OldComponent]);


        return <div ref={divRef} id={`keep-alive-${cacheId}`} />
    }
}

export default withKeepAlive;
