import React, { useState, useEffect } from 'react';

const Comp1: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Demo1 didMount');
    return () => {
      console.log('Demo1 unMount');
    };
  }, []);

  return (
    <div>
      Demo1
      <input
        type="text"
        onChange={(e) => {
          setCount(e.target.value);
          console.log(e.target.value);
        }}
      />
      <h1>{count}</h1>
    </div>
  );
};

export default Comp1;
