import React from 'react';

const FancyButton = (props) => {
  console.log(props);
  return (
    <button className="FancyButton" type="button">
      {props.children}
    </button>
  );
};

export default FancyButton;
