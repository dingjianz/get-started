import React, { FC } from "react";

interface Props {
  [propName: string]: any;
}

const NotFoundDemo: FC<Props> = (props) => {
  return <div>直接就404了啊</div>;
};

export default NotFoundDemo;
