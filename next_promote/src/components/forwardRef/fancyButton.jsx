import React, { forwardRef } from 'react';

const FancyButton = forwardRef((props, ref) => {
  console.log(props);
  return (
    <>
      <button type="button">btn1</button>
      <button type="button" ref={ref}>
        btn2
      </button>
    </>
  );
});

export default FancyButton;
