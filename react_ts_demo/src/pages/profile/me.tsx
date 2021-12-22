import React, { FC } from "react";
import { useNavigate, NavLink } from "react-router-dom";

interface Props {
  [propName: string]: any;
}

const MeDemo: FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      me demo
      <hr />
      <NavLink to="../he">点我去 he</NavLink>
      <button onClick={() => navigate("/user/he")}>go he</button>
    </div>
  );
};

export default MeDemo;
