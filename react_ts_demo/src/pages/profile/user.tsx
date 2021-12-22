import React, { FC } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  [propName: string]: any;
}

const UserDemo: FC<Props> = (props) => {
  return (
    <div>
      user demo
      <hr />
      <Outlet />
    </div>
  );
};

export default UserDemo;
