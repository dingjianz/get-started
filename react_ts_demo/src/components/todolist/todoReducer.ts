import { ITodoType } from "enum/todoList";

export default function todoReducer(
  state: ITodoList.IState,
  action: ITodoList.IAction
): ITodoList.IState {
  const { type, payload } = action;
  switch (type) {
    case ITodoType.ADD_TODOITEM:
      return {
        ...state,
        todoList: [...state.todoList, payload as ITodoList.ITodo],
      };
    case ITodoType.REMOVE_TODOITEM:
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item.id !== (payload as ITodoList.ITodo).id
        ),
      };
    case ITodoType.TODDLE_TODOITEM:
      return {
        ...state,
        todoList: state.todoList.map((todoItem) => {
          return (payload as ITodoList.ITodo).id === todoItem.id
            ? { ...todoItem, isCompleted: !todoItem.isCompleted }
            : todoItem;
        }),
      };
    default:
      return state;
  }
}
