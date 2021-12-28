import React, { FC, ReactElement } from "react";

interface IProps {}

const TodoInput: FC<IProps> = (): ReactElement => {
  return (
    <div className="todo-input">
      <h2>todo-input</h2>
    </div>
  );
};

export default TodoInput;
