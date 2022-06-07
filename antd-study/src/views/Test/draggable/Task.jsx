import React, { memo } from 'react';
import ReactTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragDisabled, isDragging }) =>
    isDragDisabled ? 'lightgrey' : isDragging ? 'lightgreen' : 'white'};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const Task = ({ task: { id, content }, index }) => {
  const isDragDisabled = id === 'task-1';
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(dragProvided, dragSnapshot) => (
        <Container
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          isDragging={dragSnapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* {...dragProvided.dragHandleProps} 这样只能移动Handle 才能拖拽 */}
          {/* <Handle {...dragProvided.dragHandleProps} /> */}
          {content}
          {dragProvided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

Task.defaultProps = {
  task: {
    id: '',
    content: '',
  },
  index: 0,
};

Task.propTypes = {
  task: ReactTypes.shape({
    id: ReactTypes.string.isRequired,
    content: ReactTypes.string.isRequired,
  }),
  index: ReactTypes.number.isRequired,
};

export default memo(Task);
