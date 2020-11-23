import React from 'react';
import { HocComponent } from './HocComponent';
import Text1 from './Text1';
import Text2 from './Text2';

const UseReducer = () => {
  return (
    <HocComponent>
      <Text1 />
      <Text2 />
    </HocComponent>
  );
};

export default UseReducer;
