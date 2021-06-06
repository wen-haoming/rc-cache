import React,{useState} from 'react'
import {withKeepAlive,KeepAliveProvider} from '../src'

const Comp1 =  () => {
    const [count, setCount] = useState('');
    return (
      <div role="comp1">
        Demo1
        <input
          type="text"
          role="comp1-input"
          onChange={(e) => {
            setCount(e.target.value );
          }}
        />
        <h1>{count}</h1>
      </div>
    );
  };

  const Comp2 = () => {
    const [count, setCount] = useState(0);
    return (
      <h1 role="comp2">
        Demo2
        <button role="add-count" id="add-count" onClick={() => setCount(count + 1)}>{count}</button>
      </h1>
    );
  };


const EnhanceComp1 = withKeepAlive(Comp1);
const EnhanceComp2 = withKeepAlive(Comp2);

const App = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div role="wrapper">
      <KeepAliveProvider>
        <>
          <button role="btn" onClick={() => setFlag(!flag)}>change</button>
          {flag ? <EnhanceComp2 /> : <EnhanceComp1 />}
        </>
      </KeepAliveProvider>
    </div>
  );
};

export default App