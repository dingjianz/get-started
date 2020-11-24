import React from 'react';
import { HocComponent } from '@/components/useReducer/HocComponent';
import Text1 from '@/components/useReducer/Text1';
import Text2 from '@/components/useReducer/Text2';

const UseReducer = () => {
  return (
    <HocComponent>
      <Text1 />
      <Text2 />
    </HocComponent>
  );
};

export default UseReducer;
