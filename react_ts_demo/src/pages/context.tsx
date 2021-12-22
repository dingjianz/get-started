import React, { FC } from "react";
import theme from "api/theme";

console.log(theme);

interface Props {
  [propName: string]: any;
}

const ContextDemo: FC<Props> = (props) => {
  return <div>context demo</div>;
};

export default ContextDemo;
