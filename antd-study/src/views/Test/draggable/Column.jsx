import React from 'react';
import ReactTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { WithImmutable } from '@components';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 250px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  min-height: 100px;
  background-color: ${({ isDropDisabled, isDraggingOver }) =>
    isDropDisabled ? 'lightgrey' : isDraggingOver ? 'skyblue' : 'white'};
`;

const Column = ({ column: { title, id }, tasks }) => (
  <Container>
    <Title>{title}</Title>
    {/* type="done" 就不能拖进和拖出 */}
    {/* isDropDisabled={true} 能拖出，不能拖进  */}
    <Droppable
      droppableId={id}
      // type={id === 'column-3' ? 'done' : 'active'}
      isDropDisabled={id === 'column-3'}
      direction="vertical"
    >
      {(dropProvided, dropSnapshot) => (
        <TaskList
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={id === 'column-3'}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {dropProvided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </Container>
);

Column.defaultProps = {
  column: {
    title: '',
    id: '',
  },
  tasks: [],
};

Column.propTypes = {
  column: ReactTypes.shape({
    title: ReactTypes.string.isRequired,
    id: ReactTypes.string.isRequired,
  }),
  tasks: ReactTypes.arrayOf(
    ReactTypes.shape({
      id: ReactTypes.string,
      content: ReactTypes.string,
    })
  ),
};

export default WithImmutable(Column);
