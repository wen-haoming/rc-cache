import React, { useState } from 'react';
import { KeepAliveProvider, withKeepAlive } from '../../src/index';
import Comp1 from './Comp1';
import Comp2 from './Comp2';

const EnhanceComp1 = withKeepAlive(Comp1,{scroll:true});
const EnhanceComp2 = withKeepAlive(Comp2);

const App = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <KeepAliveProvider>
        <>
          <button onClick={() => setFlag(!flag)}>change</button>
          {flag ? <EnhanceComp2 /> : <EnhanceComp1  />}
        </>
      </KeepAliveProvider>
    </div>
  );
};

export default App;
