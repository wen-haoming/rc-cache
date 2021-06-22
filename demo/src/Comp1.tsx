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
    <div style={{overflow:'scroll',height:500,border:'1px solid #ccc'}}>
      Demo1
      <input
        type="text"
        onChange={(e) => {
          setCount(e.target.value);
          console.log(e.target.value);
        }}
      />
      <h1>{count}</h1>
      {
        Array(300).fill('').map((item,idx)=>{
         return <p key={idx}>{idx}</p>
        })
      }
    </div>
  );
};

export default Comp1;
