import React, { FC, ReactElement } from "react";
import { TodoInput, TodoItem } from "components/todolist";
import { Button } from "antd-mobile";

interface IProps {}

const TodoList: FC<IProps> = (): ReactElement => {
  return (
    <div className="todo-list">
      <TodoInput />
      <TodoItem />
    </div>
  );
};

export default TodoList;
