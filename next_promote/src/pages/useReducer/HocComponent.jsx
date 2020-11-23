import React, { createContext, useReducer } from 'react';

export const MyContext = createContext();

const initState = {
  name: '默认name',
  age: '默认age',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setname':
      return {
        ...state,
        name: action.name,
      };
    case 'setage':
      return {
        ...state,
        age: action.age,
      };
    default:
      return state;
  }
};

export const HocComponent = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <MyContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
