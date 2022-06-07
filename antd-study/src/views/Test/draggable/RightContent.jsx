/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '吃饭' },
    'task-2': { id: 'task-2', content: '睡觉' },
    'task-3': { id: 'task-3', content: '看电影' },
    'task-4': { id: 'task-4', content: '跑步' },
    'task-5': { id: 'task-5', content: '打篮球' },
    'task-6': { id: 'task-6', content: '饮茶' },
    'task-7': { id: 'task-7', content: '散步' },
    'task-8': { id: 'task-8', content: '做饭' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: '未做',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: '已做',
      taskIds: ['task-5', 'task-6', 'task-7'],
    },
    'column-3': {
      id: 'column-3',
      title: '已做',
      taskIds: ['task-8'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const RightContent = ({ leftBoxWidth }) => {
  const [state, setState] = useState(initialData);

  const handleDragEnd = (result) => {
    console.log('result===', result);
    document.body.style.color = 'inherit';
    document.querySelector('.right-content').style.background = 'inherit';
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      // 同一个大块块下小块块移动
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      // 不同大块下的小块块移动
      const columnSource = state.columns[source.droppableId];
      const newTaskIdsSource = Array.from(columnSource.taskIds);
      const columnDestination = state.columns[destination.droppableId];
      const newTaskIdsDestination = Array.from(columnDestination.taskIds);
      newTaskIdsSource.splice(source.index, 1);
      newTaskIdsDestination.splice(destination.index, 0, draggableId);
      const newColumnSource = {
        ...columnSource,
        taskIds: newTaskIdsSource,
      };
      const newColumnDestination = {
        ...columnDestination,
        taskIds: newTaskIdsDestination,
      };
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumnSource.id]: newColumnSource,
          [newColumnDestination.id]: newColumnDestination,
        },
      });
    }
  };

  const handleDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
  };

  const handleDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / state.columns[destination.droppableId].taskIds.length
      : 0;
    document.querySelector(
      '.right-content'
    ).style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  return (
    <div
      className="right-content"
      style={{
        width: `calc(100% - ${leftBoxWidth}px)`,
      }}
    >
      <DragDropContext
        // onDragStart={handleDragStart}
        // onDragUpdate={handleDragUpdate} // 通常只用onDragEnd
        onDragEnd={handleDragEnd}
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default RightContent;
