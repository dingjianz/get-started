import {
  FC, MouseEventHandler, ReactElement, useRef, memo,
} from 'react';
import { Toast } from 'antd-mobile';

interface IProps {
  addTodoItem(todoItem: ITodoList.ITodo): void;
  todoList: ITodoList.ITodo[];
}

const TodoInput: FC<IProps> = ({ addTodoItem, todoList }): ReactElement => {
  const iptRef = useRef<HTMLInputElement | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    // const val = iptRef.current!.value;
    const val = (iptRef.current as HTMLInputElement).value;
    if (val?.length) {
      const isExist = todoList.find((item) => item?.content === val);
      if (isExist) return Toast.info('该项已存在');
      addTodoItem({
        id: new Date().getTime(),
        content: val,
        isCompleted: false,
      });
      // iptRef.current!.value = '';
      (iptRef.current as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="todo-input">
      <input placeholder="请输入待办项" type="text" ref={iptRef} />
      <button type="button" onClick={handleClick}>
        确定
      </button>
    </div>
  );
};

export default memo(TodoInput);
