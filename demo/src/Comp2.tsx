import React, { useState,useEffect } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Demo2 didMount')
    return () => {
      console.log('Demo2 unMount')
    };
  }, []);
  return (
    <h1>
      Demo2
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </h1>
  );
};
