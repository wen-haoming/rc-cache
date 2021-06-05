import React, { useState } from 'react'
import { KeepAliveProvider, withKeepAlive } from '../../src/index'

const Comp1 = ()=>{
    const [count,setCount] = useState(0)
    return <div>
        Demo1
        <input type="text" onChange={(e)=>setCount(e.target.value)} />
        <h1>{count}</h1>
    </div>
}

const Comp2 = ()=>{
    return <h1>
      Demo2
    </h1>
}

const App = ()=>{
    console.log(KeepAliveProvider,withKeepAlive)
    const [flag,setFlag] = useState(false)

    return <div>
        <KeepAliveProvider>
        <button onClick={()=>setFlag(!flag)}>change</button>
        {
            flag?<Comp2/>:<Comp1/>
        }
        </KeepAliveProvider>
    </div>
}

export default App