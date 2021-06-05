import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  return (
    <h1>
      Demo2
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </h1>
  );
};
