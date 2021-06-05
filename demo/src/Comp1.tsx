import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
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
