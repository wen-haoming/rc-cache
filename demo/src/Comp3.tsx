import React, { useState,useEffect } from 'react';

export default (props) => {
  const {dispatchAction} = props
 
  return (
    <h1>
      Demo2
      <button onClick={()=> dispatchAction({type:'DESTROY',payload:'comp1'})}>dispatchAction comp1</button>
    </h1>
  );
};
