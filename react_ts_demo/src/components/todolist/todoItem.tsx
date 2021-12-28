import React, { FC, ReactElement } from "react";
import styles from "./index.module.scss";

interface IProps {}

const TodoItem: FC<IProps> = (): ReactElement => {
  return (
    <div className={styles.todo_item}>
      <span>todo-item</span>
    </div>
  );
};

export default TodoItem;
